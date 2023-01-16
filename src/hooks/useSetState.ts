import {shallowEqual} from '@utils';
import {useCallback, useRef, useState} from 'react';

type UseSetStateResult<T extends Record<any, any>> = [T, (patch: T | ((state: T) => T)) => void];

/**
 * @example
 *
 * const [state, setState] = useSetState({name: 'simon', age: 2});
 *
 * setState(val => ({...val, age: val.age + 1}));
 * setState(val => ({age: val.age + 1}));
 * setState({name: 'david'});
 *
 */
export function useSetState<
  T extends Record<any, any>
>(initState: T | (() => T) = {} as T): UseSetStateResult<T> {
  const [state, set] = useState(initState);
  const memoState = useRef(state);

  const setState = useCallback(function(patch: T | ((state: T) => T)) {
    const prevState = memoState.current;
    const nextState = typeof patch === 'function'
      ? Object.assign({}, prevState, patch(prevState))
      : Object.assign({}, prevState, patch);

    // Do not modify the data at the same time to prevent duplicate rendering
    !shallowEqual(prevState, nextState) && set(() => (memoState.current = nextState));
  }, []);

  return [state, setState];
}
