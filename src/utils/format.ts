export const dateFormat = (date: string) => {
  const res = date.split('T');

  return res[0];
};
