import { CreateDocumentForm } from '@features/CreateDocumentForm';
import { useCreateInventoryForm } from '../../lib/hooks/useCreateInventoryForm';

export const CreateInventory = () => {
  const { onSubmit, initialValues } = useCreateInventoryForm();

  return <CreateDocumentForm onSubmit={onSubmit} initialValues={initialValues} />;
};
