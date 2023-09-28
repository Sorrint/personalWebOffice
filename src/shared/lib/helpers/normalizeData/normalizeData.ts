interface dataWithId {
    _id: string
}

export const normalizeData = <T extends dataWithId> (data: T[]) : Record<string, T> => {
    const obj: Record<string, T> = {};

    data.forEach((element) => {
        obj[element._id] = element;
    });
    
    return obj;
};