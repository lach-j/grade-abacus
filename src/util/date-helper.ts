export const pad = (
  value: object | number | string,
  length: number,
  padChar: string = '0',
): string => {
  let paddedValue = value.toString();
  while (paddedValue.length < length) {
    paddedValue = `${padChar}${paddedValue}`;
  }
  return paddedValue;
};

export const formattedDateTime = (): string => {
  const date = new Date();

  const year = pad(date.getFullYear(), 4);
  const month = pad(date.getMonth(), 2);
  const day = pad(date.getDate(), 2);
  const hour = pad(date.getHours(), 2);
  const minute = pad(date.getMinutes(), 2);
  const seconds = pad(date.getSeconds(), 2);

  return `${year}${month}${day}_${hour}${minute}${seconds}`;
};
