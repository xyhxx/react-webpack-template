const friendlySyntaxErrorLabel = 'Syntax error:';

/**
 * @param {string} message
 */
function isLikelyASyntaxError(message) {
  return message.indexOf(friendlySyntaxErrorLabel) !== -1;
}

/**
 * @param {string | Record<string, string>[] | Record<string, string>} msg
 */
function formatMessage(msg) {
  let lines = [];

  if (typeof msg === 'string') {
    lines = msg.split('\n');
  } else if ('message' in msg) {
    lines = msg['message'].split('\n');
  } else if (Array.isArray(msg)) {
    msg.forEach(function(message) {
      if ('message' in message) lines = message['message'].split('\n');
    });
  }

  lines = lines.filter(line => !/Module [A-z ]+\(from/.test(line));

  lines = lines.map(function(line) {
    const parsingError = /Line (\d+):(?:(\d+):)?\s*Parsing error: (.+)$/.exec(
      line,
    );
    if (!parsingError) return line;

    const [, errorLine, errorColumn, errorMessage] = parsingError;
    // eslint-disable-next-line max-len
    return `${friendlySyntaxErrorLabel} ${errorMessage} (${errorLine}:${errorColumn})`;
  });

  let message = lines.join('\n');
  // Smoosh syntax errors (commonly found in CSS)
  message = message.replace(
    /SyntaxError\s+\((\d+):(\d+)\)\s*(.+?)\n/g,
    `${friendlySyntaxErrorLabel} $3 ($1:$2)\n`,
  );
  // Clean up export errors
  message = message.replace(
    /^.*export '(.+?)' was not found in '(.+?)'.*$/gm,
    'Attempted import error: \'$1\' is not exported from \'$2\'.',
  );
  message = message.replace(
    /^.*export 'default' \(imported as '(.+?)'\) was not found in '(.+?)'.*$/gm,
    'Attempted import error: \'$2\' does not contain a default export (imported as \'$1\').',
  );
  message = message.replace(
    /^.*export '(.+?)' \(imported as '(.+?)'\) was not found in '(.+?)'.*$/gm,
    'Attempted import error: \'$1\' is not exported from \'$3\' (imported as \'$2\').',
  );
  lines = message.split('\n');

  if (lines.length > 2 && lines[1].trim() === '')lines.splice(1, 1);

  lines[0] = lines[0].replace(/^(.*) \d+:\d+-\d+$/, '$1');

  if (lines[1] && lines[1].indexOf('Module not found: ') === 0) {
    lines = [
      lines[0],
      lines[1]
        .replace('Error: ', '')
        .replace('Module not found: Cannot find file:', 'Cannot find file:'),
    ];
  }

  if (lines[1] && lines[1].match(/Cannot find module.+sass/)) {
    lines[1] = 'To import Sass files, you first need to install sass.\n';
    lines[1]
      += 'Run `npm install sass` or `yarn add sass` inside your workspace.';
  }

  message = lines.join('\n');

  message = message.replace(
    /^\s*at\s((?!webpack:).)*:\d+:\d+[\s)]*(\n|$)/gm,
    '',
  ); // at ... ...:x:y
  message = message.replace(/^\s*at\s<anonymous>(\n|$)/gm, '');
  lines = message.split('\n');

  lines = lines.filter(function(line, index, arr) {
    return (
      index === 0 || line.trim() !== '' || line.trim() !== arr[index - 1].trim()
    );
  });

  message = lines.join('\n');
  return message.trim();
}

/**
 *
 * @param {Array<string
 * | Record<string, string>[]
 * | Record<string, string>>} json
 */
function formatWebpackMessages(json) {
  const formattedErrors = json.errors.map(formatMessage);
  const formattedWarnings = json.warnings.map(formatMessage);
  const result = {errors: formattedErrors, warnings: formattedWarnings};
  if (
    result.errors.some(isLikelyASyntaxError)
  ) result.errors = result.errors.filter(isLikelyASyntaxError);

  return result;
}

export default formatWebpackMessages;
