interface ObjectRecord {
    [key: string]: any;
}

export const replaceObjectKeys = (keysObj: ObjectRecord, replaceObj: ObjectRecord): ObjectRecord => {
    const newObject: ObjectRecord = {};
    Object.keys(replaceObj).forEach((key) => {
        const value = replaceObj[key];
        const newKey = keysObj[key] || key;
        newObject[newKey] = value;
    });
    return newObject;
};
