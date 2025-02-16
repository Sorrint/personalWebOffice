import { useCreateInventory } from '@entities/inventories';
import { CreateDocumentValues } from '@features/CreateDocumentForm';
import { useGetCounter } from '@shared/api/countersAPI';

import { AppRoutes } from '@shared/config/router';
import { useNavigate } from 'react-router-dom';

export const useCreateInventoryForm = () => {
  const navigate = useNavigate();
  const [createDoc] = useCreateInventory();
  const { data: docNumber } = useGetCounter('docNumber', { refetchOnMountOrArgChange: true });

  const onSubmit = async (data: CreateDocumentValues) => {
    const doc = await createDoc({
      choosenDate: data.chosenDate,
      comment: data.comment,
      documentNumber: data.documentNumber,
      storeName: data.company,
    });

    if ('data' in doc) {
      const number = doc.data.documentNumber.toString();
      if (number) {
        navigate(AppRoutes.getInventoryDetailsRoute(number));
      }
    }
  };

  const initialValues = { documentNumber: docNumber, company: 'Сатурн' };
  return { onSubmit, initialValues };
};
