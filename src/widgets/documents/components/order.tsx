import { FC, useState, useEffect } from 'react';

import { IDocsNavLink } from './consts/types';
import { docsNavLinks } from './consts/docsNavLinks';

import { useAppDispatch } from 'shared/lib/hooks';
import Table from 'shared/ui/table/components/table';

// import { read, utils } from 'xlsx';
// import { readGoods } from '../../../entities/goods/model/reducers/GoodsSlice';
// import { getGoodsObject, getHeadersObject } from '../libs/modifiedExcelObjects';
// import { orderHeaders } from './consts/tableHeaders';

const Order: FC = () => {
    // const dispatch = useAppDispatch();
    const [tableHeaders, setTableHeaders] = useState();
    const [ribbonButtons, setRibbonButtons] = useState<IDocsNavLink[]>([docsNavLinks[0]]);
    const [goods, setGoods] = useState();
    const dispatch = useAppDispatch();

    const handleSubmit = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
    };
    const handleChange = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        // dispatch(readGoods(e));
        // const file = e.target.files[0];
        // const data = await file.arrayBuffer();
        // const wb = read(data, { WTF: true });
        // const order = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 'A' });

        // const firstTableRow = order.find((item) => Object.values(item).find((item) => item === '№'));
        // const startTableIndex = Object.keys(firstTableRow).find((item) => firstTableRow[item] === '№');

        // const goodsArray = [];
        // Object.keys(order).filter((key) => {
        //     if (typeof order[key][startTableIndex] === 'number') goodsArray.push(order[key]);
        // });

        // const modifiedHeaders = getHeadersObject(firstTableRow, orderHeaders);
        // const modifiedGoods = goodsArray.map((item) => getGoodsObject(item, modifiedHeaders));

        // setTableHeaders({ ...modifiedHeaders });
        // setGoods({ ...modifiedGoods });
    };

    // useEffect(() => {
    //     setRibbonButtons([...docsNavLinks]);
    // }, [goods]);
    return (
        <>
            <form>
                <input type="file" onChange={(e) => handleChange(e)} onClick={(e) => handleSubmit(e)} />
            </form>
            {goods ? (
                <div className="app__body">
                    <div className="app__container">
                        <Table columns={tableHeaders} data={goods} />
                    </div>
                </div>
            ) : (
                'Не выбран заказ'
            )}
        </>
    );
};

export default Order;
