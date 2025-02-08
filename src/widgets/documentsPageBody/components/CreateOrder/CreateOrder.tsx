import { CreateDocumentForm } from '@features/CreateDocumentForm';
import { useCreateOrderForm } from '../../libs/hooks/useCreateOrderForm';

export const CreateOrder = () => {
  const { onSubmit, initialValues } = useCreateOrderForm();

  return <CreateDocumentForm onSubmit={onSubmit} initialValues={initialValues} />;
};
