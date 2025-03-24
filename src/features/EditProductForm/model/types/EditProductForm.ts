export type FormVariants = 'delete' | 'update' | 'create';

export type FormProps = {
  popupText: string;
  buttonText: string;
  method: FormVariants;
};
