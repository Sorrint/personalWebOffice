export const replaceObjectKeys = <T>(
  keyMap: Record<string, keyof T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: Record<string, any>,
): Record<keyof T, T[keyof T]> => {
  return Object.keys(obj).reduce(
    (acc: Record<keyof T, T[keyof T]>, key) => {
      const newKey = keyMap[key];
      if (newKey) {
        acc[newKey] = obj[key];
      }
      return acc;
    },
    {} as Record<keyof T, T[keyof T]>,
  );
};
