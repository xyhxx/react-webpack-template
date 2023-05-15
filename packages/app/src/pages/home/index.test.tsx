import routes from '@routes';
import {RouterProvider} from 'react-router-dom';
import {fireEvent, render} from '@testing-library/react';

it(`
    1. click increment btn, innterHTML is count is 1
    2. click reduce btn, innertTHML is count is 0
  `, function() {
  const {container} = render(<RouterProvider router={routes} />);

  const incrementBtn = container.querySelector('#inc_btn')!;
  const decBtn = container.querySelector('#dec_btn')!;
  const html = container.querySelector('#title')!;

  fireEvent.click(incrementBtn);

  expect(html.innerHTML).toBe('count is 1');

  fireEvent.click(decBtn);

  expect(html.innerHTML).toBe('count is 0');
});
