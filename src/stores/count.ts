import {createStore} from 'zustand';
import {zustandDevtools} from '@stores';

type State = {
  count: number;
};

type Action = {
  inc: () => void;
  dec: () => void;
};

export const countState = createStore<State & Action>(
  function(set) {
    return {
      count: 0,
      inc() {
        set(val => ({count: val.count + 1}), false);
      },
      dec() {
        set(val => ({count: val.count - 1}), false);
      },
    };
  },
);

process.env.NODE_ENV === 'development' && zustandDevtools('countState', countState);
