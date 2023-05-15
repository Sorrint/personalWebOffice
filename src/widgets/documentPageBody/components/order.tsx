import { FC, useState } from 'react';

import Table from 'shared/ui/table/components/table';
import { productsAPI } from 'entities/products';
import { productsDreamkasConfig } from 'entities/products/model/productsDreamkasConfig';

import { readXLSXTable } from 'shared/lib/utils/readXLSXtable';
import { parseSheetData } from 'shared/lib/utils/parseSheetData';
import { IHeaderItem, IRecord } from 'shared/ui/table/tableTypes';
import { productsStoreConfig } from 'entities/products/model/productsStoreConfig';

const Order: FC = () => {
    const [tableHeaders, setTableHeaders] = useState<IHeaderItem | undefined>();
    const [goods, setGoods] = useState<IRecord[] | undefined>();

    const dataBase = localStorage.getItem('dataBase');
    const { data, isLoading } = productsAPI.useLoadProductsQuery();

    const productConfig = dataBase === 'dreamkasStorage' ? productsDreamkasConfig : productsStoreConfig;

    const handleChange = async (e: React.BaseSyntheticEvent) => {
        const data = await readXLSXTable(e, 'TDSheet');
        if (typeof data === 'string') return null;
        const parse = parseSheetData(data, '№');
        if (typeof parse === 'string') return null;
        setTableHeaders(parse.tableHeader);
        setGoods(parse.tableBody);
        // e.preventDefault();
    };

    return (
        <>
            <form>
                <input type="file" onChange={(e) => handleChange(e)} />
            </form>
            {goods && tableHeaders ? (
                <div className="app__body">
                    <div className="app__container">
                        <Table headers={tableHeaders} data={goods} />
                    </div>
                </div>
            ) : (
                'Не выбран заказ'
            )}
        </>
    );
};

export default Order;
