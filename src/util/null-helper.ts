export const isNullOrUndefined = (val: any) => {
  if (typeof val === 'number' && Number.isNaN(val)) return true;
  return val === null || val === undefined;
};
