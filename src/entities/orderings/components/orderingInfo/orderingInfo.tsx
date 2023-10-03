import { PalletsText } from '../../consts/palletsConsts';
import styles from './orderingInfo.module.scss';


// type palletsCount = Record <PalletsText, number>

interface OrderingInfoProps {
    classname?: string
    orderingInfo: {
        palletsCount: {
            pallets125?: number
            pallets99?: number
            pallets?: number
        }
        corrugatedSheetsCount: {
            'T21': number
            'T99/2': number
        }
        slipSheetsCount?: number
        grossWeight: number
        shipmentDay?: Date
    }
}
export const OrderingInfo = (props: OrderingInfoProps) => {
    const {orderingInfo} = props;
    
    const pallets = Object.entries(orderingInfo.palletsCount).map(([key, value]) => {
        const text = PalletsText[key as keyof typeof PalletsText];
        return text && `${value} ${text}`;
    }).join(', ');

    const corrugatedSheets = Object.entries(orderingInfo.corrugatedSheetsCount).map(([key, value]) => {
        return value && `${value} шт ${key}`;
    }).join(', ');

    const slipSheetsCount = orderingInfo.slipSheetsCount;
    const grossWeight = orderingInfo.grossWeight;
    const shipmentDay = orderingInfo.shipmentDay?.toString();
    return <div>
        <p>Паллеты: {pallets}</p>
        <p>ДВП неконд: {slipSheetsCount && `${slipSheetsCount} шт`}</p>
        <p>Гофролист: {corrugatedSheets}</p>
        <p>Вес брутто ориентировочно: {grossWeight && `${grossWeight} кг`}</p>
        <p>Отгрузка ориентировочно: {shipmentDay}</p>
    </div>;
};