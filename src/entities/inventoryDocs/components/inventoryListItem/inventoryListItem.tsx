import { memo } from 'react';

import { transformDate } from '@shared/lib/helpers';
import { AppLink } from '@shared/ui/appLink';

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
            <AppLink
                to={`${documentNumber}`}
                classname={styles.item}
            >{`Инвентаризация № ${documentNumber} от ${date}. ${comment}`}</AppLink>
        </>
    );
});
