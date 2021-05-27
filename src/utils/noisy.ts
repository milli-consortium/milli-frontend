export const noisy = <U extends unknown[]>(f: (...args: U) => void) => (
  ...args: U
) => {
  // eslint-disable-next-line no-console
  console.log('before ', f.name);
  f(...args);
  // eslint-disable-next-line no-console
  console.log('after ', f.name);
};
