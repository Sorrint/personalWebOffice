import { transformProductName } from './transformProductName';

describe('transformProductName', ()=> {
    test('Добавляем пробелы перед словом кг', ()=> {
        expect(transformProductName('Краска акриловая 7кг')).toBe('Краска акриловая 7 кг');
    });
    test('Добавляем пробелы перед целым числом', ()=> {
        expect(transformProductName('Краска акриловая25 кг')).toBe('Краска акриловая 25 кг');
    });
    test('Добавляем пробелы перед дробным числом', ()=> {
        expect(transformProductName('Краска акриловая2,5 кг')).toBe('Краска акриловая 2,5 кг');
    });
});

