type Obj<T> = Record<string | number, T>;
interface NormalizedDataResult<T> {
  data: Obj<T>;
  duplicatedKeysData: T[];
}

export const normalizeData = <T, K extends keyof T>(data: T[], key: K): NormalizedDataResult<T> => {
  const obj: Obj<T> = {};
  const duplicatedKeysData: T[] = [];
  data.forEach(element => {
    const keyValue = element[key];

    if (typeof keyValue === 'string' || typeof keyValue === 'number') {
      obj[keyValue] ? (obj[keyValue] = element) : duplicatedKeysData.push(element);
    } else {
      throw new Error(`Key "${String(key)}" must be of type string or number`);
    }
  });

  return { data: obj, duplicatedKeysData };
};
