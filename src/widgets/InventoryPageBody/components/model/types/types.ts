import { FieldValues } from 'react-hook-form';

export interface FormValues extends FieldValues {
  documentNumber: number;
  company: string;
  chosenDate: Date;
  comment: string;
}
