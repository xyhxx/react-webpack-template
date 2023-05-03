declare module 'detect-port-alt' {
  function detect(defaultPort: number, host?: string): Promise<number>;

  export default detect;
}
