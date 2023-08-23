import {defineWorkspace} from 'vitest/config';

export default defineWorkspace([
  'packages/app/*',
  {
    extends: './vitest.config.ts',
  },
]);
