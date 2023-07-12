import { useEffect } from 'react';

import { EditOrderingProductCard } from '@features/editOrderingProductCard';
import { useCheckOrderProducts } from '@entities/products';
import { OrderingList } from '@entities/orderings';

import { type IOrderingProductWithExtraData, hasExtraData } from '../../libs/extraDataTypeGuard';
import './ordering.scss';

const Ordering = () => {
    // const order = useSelector(getCurrentOrder());

    const order = {
        products: [
            {
                number: 1,
                productName: 'Краска фасадная 7 кг акриловая Капитель',
                count: 234,
                unit: 'шт.'
            },
            {
                number: 2,
                productName: '  Краска    фасадная14кг   акриловая Капитель  ',
                count: 44,
                unit: 'шт.'
            },
            {
                number: 3,
                productName: 'Краска для печей и каминов 1 кг акриловая Капитель Иркутск',
                count: 5,
                unit: 'шт.'
            }
        ]
    };
    const [checkOrder, { data: resultCheck, isLoading: isChecking, isError: isCheckError }] =
        useCheckOrderProducts();

    useEffect(() => {
        checkOrder(order.products);
    }, []);

    const orderingProducts =
        // resultCheck &&
        resultCheck?.productsExists.filter((item): item is IOrderingProductWithExtraData => hasExtraData(item));

    const notAllFieldProducts = resultCheck?.productsExists.filter((item) => !hasExtraData(item));
    return (
        <>
            {isCheckError && <>Ошибка c подключением</>}
            {isChecking && <>&lsquo;Идет проверка документа&lsquo;</>}
            {notAllFieldProducts?.length && notAllFieldProducts.map((item) => <div key={item._id}>{item.name}</div>)}
            {resultCheck?.productsNotExists.map((product) => (
                <EditOrderingProductCard product={product} key={product.number} />
            ))}
            <div>Порядовка</div>
            {orderingProducts && <OrderingList products={orderingProducts} />}
        </>
    );
};

export default Ordering;
// const {productsExists} = resultCheck
// async function fetchOrder() {
//     const result = await checkOrder(order.products);
//     if ('data' in result) {
//         return result.data;
//     } else {
//         return result.error;
//     }
// }
// const productsExists =
// const products = useSelector(getProducts());
// const dispatch = useAppDispatch();
// const product = {
//     name: 'Новый       товар',
//     type: productType.COUNTABLE,
//     tax: productTax.NDS_NO_TAX
// };
// dispatch(addProduct(product));

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

/* <input type="file" onChange={handleChange} /> */

/* {ordering && headers ? (
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
            )} */
