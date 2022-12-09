import icon from '@assets/images/logo.svg';

import css from './index.module.scss';

import cla from 'classnames';
import {FC} from 'react';
import {useCount} from '@stores';
import shallow from 'zustand/shallow';

const Home: FC = function() {
  const {count, inc, dec} = useCount(state => state, shallow);

  return (
    <>
      <img src={icon} className={css.icon} />
      <h1 className={cla([css.title, css.name, {[css['title-red']]: count >= 5}])}>React</h1>
      <h2 className={css.title} data-testid='title'>
        count is {count}
      </h2>
      <div className={css.btnGroup}>
        <button onClick={inc} data-testid='increment'>
          increment
        </button>
        <button onClick={dec} data-testid='reduce'>
          reduce
        </button>
      </div>
    </>
  );
};

export default Home;
