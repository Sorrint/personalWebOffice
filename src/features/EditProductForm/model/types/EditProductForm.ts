export type FormVariants = 'delete' | 'update' | 'create';

export type IFormProps = {
  popupText: string;
  buttonText: string;
  method: FormVariants;
};
