import icon from '@assets/images/logo.svg';
import {FC, PropsWithChildren} from 'react';
import {useCountState} from '@stores';
import classNames from 'classnames';

type Props = {
  onClick: () => void;
  id: string;
  className?: string;
  [key: string]: any;
};

const Button: FC<PropsWithChildren<Props>> = function ({
  children,
  className,
  ...restProps
}) {
  return (
    <button
      className={classNames(
        className,
        'plb-2 pli-0 w-24 cursor-pointer rounded border-0 text-white',
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};

const Home: FC = function () {
  const {count, inc, dec} = useCountState();

  return (
    <main className="pbs-[10vh] min-h-screen bg-[#20232a]">
      <img src={icon} className="mlb-0 mli-auto block w-[20vw]" />
      <h1
        className={classNames(
          'mbs-20 text-center text-[60px] text-white transition-colors duration-500',
          {'text-red-500': count >= 5},
        )}
      >
        React
      </h1>
      <h2 className="mbs-20 text-center" data-testid="title" id="title">
        count is {count}
      </h2>
      <div className="mbs-8 mbe-0 mli-auto flex w-52 items-center justify-evenly">
        <Button
          onClick={inc}
          data-testid="inc_btn"
          id="inc_btn"
          className="mie-4 bg-green-500"
        >
          increment
        </Button>
        <Button
          onClick={dec}
          data-testid="dec_btn"
          id="dec_btn"
          className="bg-blue-500"
        >
          decrease
        </Button>
      </div>
    </main>
  );
};

export default Home;
