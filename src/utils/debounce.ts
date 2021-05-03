/**
 * Return a function that runs the original function only if `t` passes without a call to it
 * @param t time in milliseconds
 * @param fn function to debounce
 * @returns debounced function
 */
export const debounce = <T extends (...x: unknown[]) => void>(
  t: number,
  fn: T,
) => {
  let handle = null;

  return (...args: unknown[]) => {
    if (handle !== null) clearTimeout(handle);
    handle = setTimeout(() => {
      fn(...args);
      handle = null;
    }, t);
  };
};
