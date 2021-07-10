// TODO: replace {} with something better like Record<string, unknown>
// eslint-disable-next-line @typescript-eslint/ban-types
export const hasOwnProperty = <X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y,
): obj is X & Record<Y, unknown> =>
  Object.prototype.hasOwnProperty.call(obj, prop);
