export function getGoodsObject (tableObject, headersObject) {
    const row = { row: tableObject.__rowNum__ };

    const changedObject = Object.keys(tableObject).reduce((goods, item) => {
        const match = Object.keys(headersObject).find((key) => headersObject[key].letter === item);
        if (match) {
            goods[match] = tableObject[item];
        }
        return goods;
    }, {});
    return Object.assign({}, changedObject, row);
}

export function getHeadersObject (tableObject, dataBaseObject) {
    const changedObject = Object.keys(tableObject).reduce((headers, item) => {
        const match = Object.keys(dataBaseObject).find((key) => dataBaseObject[key].text === tableObject[item]);
        if (match) {
            headers[match] = dataBaseObject[match];
            headers[match].letter = item;
        }
        return headers;
    }, {});
    return Object.assign({}, changedObject);
}
