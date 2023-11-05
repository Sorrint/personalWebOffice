import { memo } from 'react';
import { Link } from 'react-router-dom';

import { transformDate } from '@shared/lib/helpers';

import { type IInventoryDocs } from '../../model/types';

import styles from './inventoryDocs.module.scss';

interface InventoryListItemProps {
    document: IInventoryDocs
}
export const InventoryListItem = memo(({ document }: InventoryListItemProps) => {
    const { documentNumber, choosenDate, comment } = document;
    const date = transformDate(choosenDate);
    return (
        <>
            <Link
                to={`${documentNumber}`}
                className={styles.item}
            >{`Инвентаризация № ${documentNumber} от ${date}. ${comment}`}</Link>
        </>
    );
});
