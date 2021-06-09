export type Action<T extends string, K extends unknown = never> = {
  type: T;
  payload: K;
};
