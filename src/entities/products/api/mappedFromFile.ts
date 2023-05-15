import { FileDB } from '../model/IGoods';
import { IDbHeaders, IGoods } from '../model/IGoods';
import { dbHeaders } from '../model/dataBase';

export function transformHeaders(headersRow: FileDB) {
    const modifiedHeaders = dbHeaders.reduce((result: IDbHeaders[], header) => {
        const letter = Object.keys(headersRow).find((key) =>
            headersRow[key as keyof FileDB] === header.text ? { ...header, letter: key } : ''
        );
        letter && result.push({ ...header, letter });
        return result;
    }, []);
    return modifiedHeaders;
}

export function transformGoods(dataBase: FileDB[], headers: IDbHeaders[]) {
    const modifiedGoods = dataBase.reduce((goods: IGoods[], item) => {
        let result: FileDB = {};
        Object.keys(item).map((key) => {
            const match = headers.find((header) => header.letter === key);
            if (match) {
                result[match.id] = item[key];
            }
        });
        goods.push(result);
        return goods;
    }, []);
    return modifiedGoods;
}
