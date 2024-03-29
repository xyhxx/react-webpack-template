import {shallowEqual} from '@utils';
import {createWithEqualityFn} from 'zustand/traditional';

type State = {
  count: number;
};

type Action = {
  inc: () => void;
  dec: () => void;
};

export const useCountState = createWithEqualityFn<State & Action>(function (
  set,
) {
  return {
    count: 0,
    inc() {
      set(function ({count}) {
        return {
          count: process.env.E2E === 'true' ? count + 2 : count + 1,
        };
      }, false);
    },
    dec() {
      set(function ({count}) {
        return {
          count: process.env.E2E === 'true' ? count - 2 : count - 1,
        };
      }, false);
    },
  };
}, shallowEqual);
