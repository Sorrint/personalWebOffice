import { useEffect, useState } from 'react';
import { read, utils } from 'xlsx';

import api from '../api/orderingHeaders';
import { getGoodsObject, getHeadersObject } from '../libs/modifiedExcelObjects';

import TableHeader from 'shared/ui/table/components/tableHeader';
import TableBody from 'shared/ui/table/components/tableBody';

const Ordering = () => {
    // const [unsearchedItems, setUnsearchedItems] = useState({});
    // const [extendedGoods, setExtendedGoods] = useState();
    // const [ordering, setOrdering] = useState();
    // const [packages, setPackages] = useState();

    // const handleChange = (e) => {
    //     e.preventDefault();
    //     api.packages
    //         .fetchAll()
    //         .then((data) => {
    //             const packageOrders = Object.keys(data).map((item) => data[item].order);
    //             const sortPackageOrders = packageOrders.sort(function (a, b) {
    //                 return a - b;
    //             });
    //             const sortPackages = sortPackageOrders.map((order) =>
    //                 Object.values(data).find((item) => item.order == order)
    //             );
    //             setPackages(sortPackages);
    //             return data;
    //         })
    //         .then((packages) => {
    //             const headersWithPackages = api.headers.getOrderingHeaders().then((headers) => {
    //                 return { packages, headers };
    //             });
    //             return headersWithPackages;
    //         })
    //         .then(async (data) => {
    //             const file = e.target.files[0];
    //             const fileBuffer = await file.arrayBuffer();
    //             const wb = read(fileBuffer, { WTF: 1 });
    //             const dataBase = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 'A' });
    //             return { ...data, dataBase };
    //         })
    //         .then(({ packages, headers, dataBase }) => {
    //             const firstTableRow = dataBase.find((item) => Object.values(item).find((item) => item === 'Продукция'));
    //             const modifiedHeaders = getHeadersObject(firstTableRow, headers);
    //             const modifiedDataBase = Object.keys(dataBase).map((item) =>
    //                 getGoodsObject(dataBase[item], modifiedHeaders)
    //             );
    //             if (goods) {
    //                 const extendedGoods = Object.keys(goods).reduce((newObj, itemGoods) => {
    //                     const itemFromDB = Object.values(modifiedDataBase).find(
    //                         (itemDataBase) => itemDataBase.goods === goods[itemGoods].goods
    //                     );
    //                     if (itemFromDB) {
    //                         newObj[itemGoods] = { ...itemFromDB, ...goods[itemGoods] };
    //                     } else {
    //                         setUnsearchedItems((prevState) => ({
    //                             ...prevState,
    //                             [itemGoods]: { ...goods[itemGoods] }
    //                         }));
    //                     }
    //                     return newObj;
    //                 }, {});
    //                 setExtendedGoods(extendedGoods);
    //             }
    //         });
    // };

    // useEffect(() => {
    //     if (packages && extendedGoods) {
    //         const ordering = packages.reduce((newObj, item) => {
    //             const search = Object.values(extendedGoods).filter((goods) => goods.package === item.description);
    //             if (search.length !== 0) {
    //                 newObj[item.description] = { ...search };
    //             }
    //             return newObj;
    //         }, {});
    //         setOrdering(ordering);
    //     }
    // }, [extendedGoods, unsearchedItems]);

    // useEffect(() => {}, [ordering]);

    return (
        <>
            <div>Порядовка</div>
            {/* <input type="file" onChange={handleChange} /> */}

            {/* {ordering && headers ? (
                <div className="content__body">
                    <div className="content__container">
                        <TableHeader headers={headers} />

                        {Object.keys(ordering).map((goods) => (
                            <details open key={goods}>
                                <TableBody goods={ordering[goods]} headers={headers} />
                                <summary>{goods}</summary>
                            </details>
                        ))}
                    </div>
                </div>
            ) : (
                'Идет обработка данных'
            )} */}
        </>
    );
};

export default Ordering;
