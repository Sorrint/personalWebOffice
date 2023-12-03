import { parseWeightKg } from './parseWeightKg';

describe('parseWeightKg', ()=> {    
    test('Парсим целое число', ()=> {
        expect(parseWeightKg('Эмаль акриловая ГЛЯНЦЕВАЯ 25 кг ПРОФИ Капитель')).toBe(25);
    });
    test('Парсим дробное число', ()=> {
        expect(parseWeightKg('Эмаль акриловая ГЛЯНЦЕВАЯ 2,5 кг ПРОФИ Капитель')).toBe(2.5);
    });
    test('Парсим число без пробела перед кг', ()=> {
        expect(parseWeightKg('Эмаль акриловая ГЛЯНЦЕВАЯ 2,5кг ПРОФИ Капитель')).toBe(2.5);
    });
    test('Парсим строку без упоминания кг', ()=> {
        expect(parseWeightKg('Эмаль акриловая ГЛЯНЦЕВАЯ 2,5 г ПРОФИ Капитель')).toBe(1);
    });
});

