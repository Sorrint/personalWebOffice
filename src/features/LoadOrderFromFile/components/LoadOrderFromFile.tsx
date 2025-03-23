import { useParams } from 'react-router-dom';
import { getOrderFromExcel } from '../api/mappers/getOrderFromExcel';
import { useAddOrderRecords } from '@entities/Orders';
// import { useUpdateOrderRecordMutation } from '@widgets/documentPageBody';

export const LoadOrderFromFile = () => {
  const { orderNumber } = useParams();
  const [addOrderRecords] = useAddOrderRecords();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const order = await getOrderFromExcel(e);

    if (order) {
      const { parseError: error, records } = order;
      if (error) {
        console.log(error);
      }
      records &&
        orderNumber &&
        addOrderRecords({ orderNumber: Number(orderNumber), orderRecords: records });
    }
  };

  return (
    <>
      <form>
        <input type='file' onChange={handleChange} />
      </form>
    </>
  );
};
