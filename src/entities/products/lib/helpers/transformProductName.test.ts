import { transformProductName } from "./transformProductName";

describe('transformProductName', ()=> {
    test('Убираем пробелы перед словом кг', ()=> {
        expect(transformProductName('Краска акриловая 7кг')).toBe('Краска акриловая 7 кг');
    });
});