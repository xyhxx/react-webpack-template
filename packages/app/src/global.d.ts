/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  type ProcessEnv = {
    NODE_ENV: 'development' | 'production' | 'test';
    IS_E2E: 'true' | undefined;
    HOST: string;
    ENABLE_THREAD_LOADER: 'true' | undefined;
    ENABLE_SOURCE_MAP: 'true' | undefined;
    ENABLE_SWC: 'true' | undefined;
    ENABLE_SASS: 'true' | undefined;
    MAX_CHUNK_SIZE: 'true' | undefined;
  };
}

declare module '*.avif' {
  const src: string;
  export default src;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {title?: string}
  >;

  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: {readonly [key: string]: string};
  export default classes;
}

declare module '*.module.scss' {
  const classes: {readonly [key: string]: string};
  export default classes;
}

declare module '*.module.sass' {
  const classes: {readonly [key: string]: string};
  export default classes;
}
