export interface DbHeaders {
  id: string;
  text: string;
  letter?: string;
}

export const dbHeaders: DbHeaders[] = [
  { id: 'name', text: 'Продукция' },
  { id: 'value', text: 'вес нетто' },
  { id: 'category', text: 'Тара' },
  { id: 'units', text: 'Ед.' },
];
