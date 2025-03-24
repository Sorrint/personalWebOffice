export enum UnitTypes {
  COUNTABLE = 'COUNTABLE',
  SCALABLE = 'SCALABLE',
  WEIGHTABLE = 'WEIGHTABLE',
}
export interface Unit {
  _id: string;
  type: UnitTypes[];
  base: number;
  description: string;
}
