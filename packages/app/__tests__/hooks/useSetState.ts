import {useSetState} from '@hooks';
import {act, renderHook} from '@testing-library/react';

const setup = function<T extends Record<any, any>>(initState?: T) {
  return renderHook(function() {
    return useSetState(initState);
  });
};

describe('useSetState', function() {
  it('useSetState is defined', function() {
    expect(useSetState).toBeDefined();
  });

  it('initState is right', function() {
    const {result} = setup({age: 12});
    const [state, setState] = result.current;

    expect(state).toEqual({age: 12});

    expect(setState).toBeInstanceOf(Function);
  });

  it('initState is empty', function() {
    const {result} = setup();
    const [state] = result.current;

    expect(state).toEqual({});
  });

  it('initState is function', function() {
    const {result} = setup(() => ({name: 'simon', age: 11}));
    const [state] = result.current;

    expect(state).toEqual({name: 'simon', age: 11});
  });

  it('data should be merged when using object type', function() {
    const {result} = setup({name: 'simon', age: 10});
    const [state, setState] = result.current;
    const prevState = state;

    act(function() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setState({name: 'david', age: 22, sex: 'man'});
    });

    const nextState = result.current[0];
    expect(nextState).toEqual({name: 'david', age: 22, sex: 'man'});
    expect(nextState).not.toBe(prevState);
  });

  it('data should be merged when using function type', function() {
    const {result} = setup({name: 'simon', age: 10});
    const [state, setState] = result.current;
    const prevState = state;

    act(function() {
      setState(function(state) {
        return {name: 'david', age: state.age + 1, sex: 'man'};
      });
    });

    const nextState = result.current[0];
    expect(nextState).toEqual({name: 'david', age: 11, sex: 'man'});
    expect(nextState).not.toBe(prevState);
  });

  it('repeat rendering', function() {
    const {result} = setup({name: 'simon', age: 10});
    const [state, setState] = result.current;
    const prevState = state;

    act(function() {
      setState(function() {
        return {name: 'simon', age: 10};
      });
    });

    let nextState = result.current[0];
    expect(nextState).toBe(prevState);

    act(function() {
      setState({name: 'simon', age: 10});
    });

    nextState = result.current[0];
    expect(nextState).toBe(prevState);

    act(function() {
      setState({name: 'simon', age: 11});
    });

    nextState = result.current[0];
    expect(nextState).not.toBe(prevState);
  });

  it('setState should remain unchanged', function() {
    const {result} = setup({name: 'simon', age: 10});
    const [, setState] = result.current;
    const prevAction = setState;

    act(function() {
      setState({name: 'david', age: 12});
    });

    const nextAction = result.current[1];

    expect(prevAction).toBe(nextAction);
  });
});
