export const replaceObjectKeys = <
  T extends ObjectRecord, // Тип для объекта с ключами
  U extends ObjectRecord, // Тип для объекта с заменяемыми ключами
>(
  keysObj: T,
  replaceObj: U,
): Record<string, U[keyof U]> => {
  const newObject: ObjectRecord = {};
  Object.keys(replaceObj).forEach(key => {
    const value = replaceObj[key];
    const newKey = keysObj[key] ?? key;
    newObject[newKey] = value;
  });
  return newObject;
};
