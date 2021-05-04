type Action<T extends string, K extends unknown = never> = {
  type: T;
  payload?: K;
};

export type Filters = Record<string, boolean>;

export const filterInit = (): Filters => ({});

export const filterReducer = (
  state: Filters,
  action: Action<'SET', Filters>,
) => ({ ...action.payload });
