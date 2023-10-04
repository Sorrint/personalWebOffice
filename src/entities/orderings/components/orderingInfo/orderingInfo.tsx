import { type IOrderingSummary } from '../../model/types/ordering';
import { getCorrugatesSheetsString, getPalletsInfoString  } from '../../lib/helpers/';

interface OrderingInfoProps {
    classname?: string
    orderingInfo: IOrderingSummary
}
export const OrderingInfo = ({ orderingInfo}: OrderingInfoProps) => {
    const {corrugatedSheetsCount, 
        grossWeight, 
        palletsCount, 
        shipmentDay, 
        slipSheetsCount} = orderingInfo;
    
    const pallets = getPalletsInfoString(palletsCount);

    const corrugatedSheets = getCorrugatesSheetsString(corrugatedSheetsCount);


    return <div>
        <p>Паллеты: {pallets}</p>
        <p>ДВП неконд: {slipSheetsCount && `${slipSheetsCount} шт`}</p>
        <p>Гофролист: {`${corrugatedSheets}`}</p>
        <p>Вес брутто ориентировочно: {grossWeight && `${grossWeight} кг`}</p>
        <p>Отгрузка ориентировочно: {shipmentDay?.toString()}</p>
    </div>;
};