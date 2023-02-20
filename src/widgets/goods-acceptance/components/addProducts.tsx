import { FC, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { inventoryDocsAPI } from '../../../entities/inventoryDocs';
import { ProductList, productsAPI } from '../../../entities/products';
import { IProduct } from '../../../entities/products/model/IProducts';
import { OverlayingPopup } from '../../../features/popup';
import SearchInput from '../../../features/search/searchInput';
import CounterField from '../../../shared/ui/counterField/counterField';
import './acceptanceDocs.scss';

type FormValues = {
    name: string;
    price: number;
    quantity: number;
};

const AddProducts: FC = () => {
    const { number } = useParams();
    const docNumber = Number(number);
    const [updateList, { error: updateError }] = inventoryDocsAPI.useUpdateProductsMutation();
    const [search, setSearch] = useState<string>('');
    const { setValue, register, handleSubmit } = useForm<FormValues>({ defaultValues: { quantity: 1 } });
    const { data: goods, isLoading: goodsLoading } = productsAPI.useLoadProductBySearchQuery(
        { limit: 1000, q: search },
        {
            selectFromResult: ({ data, isLoading }) => ({ data: data?.products, isLoading })
        }
    );
    const [active, setActive] = useState<boolean>(false);
    const [product, setProduct] = useState<IProduct | null>(null);

    const getGoods = async (value: string) => {
        setSearch(value);
    };

    if (goodsLoading) return <h1>Идет загрузка</h1>;
    const handleClick = (product: IProduct) => {
        setProduct(product);
        setValue('name', product.name);
        product.price ? setValue('price', product.price / 100) : setValue('price', 0);
        setActive((prevState) => !prevState);
    };

    const showPopup = () => {
        setActive((prevState) => !prevState);
    };

    const onSubmit = async (data: FieldValues) => {
        const product = { product: data };
        const res = await updateList({ product, docNumber: docNumber }).unwrap();

        if (!updateError) showPopup();
    };
    return (
        <>
            <div className="input-area">
                <SearchInput searchFunction={getGoods} />
            </div>
            {!goodsLoading && goods?.length === 0 && <h1>Ничего не найдено</h1>}
            {goods && (
                <ProductList
                    products={goods}
                    selectField={false}
                    avatar={false}
                    count={false}
                    onClick={(product) => handleClick(product)}
                />
            )}
            <OverlayingPopup isOpened={active} onClose={showPopup}>
                <div className="popup__addProduct">
                    {product && (
                        <div className="popup__card">
                            <div className="popup__title">{product.name}</div>
                            <CounterField
                                label="Цена, ₽"
                                name="price"
                                register={register}
                                inputClass="popup__counter"
                            />
                            {/* <div className="popup__price">Цена {product.price && product.price / 100},00 ₽ </div> */}
                            <CounterField
                                label="Количество"
                                name="quantity"
                                register={register}
                                inputClass="popup__counter"
                            />
                        </div>
                    )}
                    <button className="submit-button" onClick={handleSubmit(onSubmit)}>
                        Добавить
                    </button>
                    {updateError && <div className="error-message">Произошла ошибка при отправке данных</div>}
                </div>
            </OverlayingPopup>
        </>
    );
};

export default AddProducts;
