import { FieldValues } from 'react-hook-form';

export type FormTypes = 'order' | 'inventory';

export interface FormValues extends FieldValues {
  documentNumber: number;
  company: string;
  choosenDate: Date;
  comment: string;
}
