export interface IDbHeaders {
    id: string
    text: string
    letter?: string
}

export const dbHeaders: IDbHeaders[] = [
    { id: 'name', text: 'Продукция' },
    { id: 'value', text: 'вес нетто' },
    { id: 'category', text: 'Тара' },
    { id: 'units', text: 'Ед.' }
];
