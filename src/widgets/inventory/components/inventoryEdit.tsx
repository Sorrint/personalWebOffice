import { FC, useEffect, useState } from 'react';
import { FieldValues, useFieldArray, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { InventoryCard, inventoryDocsAPI } from '../../../entities/inventoryDocs';
import { ProductList, productsAPI } from '../../../entities/products';
import { IInventoryProduct } from '../../../entities/inventoryDocs/model/types';
import { IProduct } from '../../../entities/products/model/IProducts';

import Popover from '../../../features/popover/popover';
import { OverlayingPopup } from '../../../features/popup';
import PopupCard from '../../../features/popup/popupCard/popupCard';
import SearchInput from '../../../features/search/searchInput';

import DropdownWindow from '../../../shared/ui/dropdownList/dropdownWindow';
import './acceptanceDocs.scss';

export type FormValues = {
    name: string;
    price: number;
    quantity: number;
    id: string;
};

type buttonText = 'Обновить' | 'Добавить';

const InventoryEdit: FC = () => {
    const { number } = useParams();
    const docNumber = Number(number);
    const [product, setProduct] = useState<IProduct | IInventoryProduct | null>(null);
    const [updateList, { error: updateError }] = inventoryDocsAPI.useUpdateProductsMutation();
    const [search, setSearch] = useState<string>('');
    const { setValue, register, handleSubmit, reset } = useForm<FormValues>({
        defaultValues: { quantity: 1 }
    });

    //Загрузка данных
    const {
        data: goods,
        isLoading: goodsLoading,
        isFetching
    } = productsAPI.useLoadProductBySearchQuery({ limit: 1000, q: search });

    //состояния popup && popover
    const [activePopover, setActivePopover] = useState<boolean>(true);
    const [activePopup, setActivePopup] = useState<boolean>(false);

    const [reference, setReference] = useState<any>(null);
    const [buttonText, setButtonText] = useState<buttonText>('Добавить');
    useEffect(() => {
        goods && setActivePopover(goods?.length > 0);
    }, [goods]);

    const getGoods = async (value: string) => {
        setSearch(value);
    };

    if (goodsLoading) return <h1>Идет загрузка</h1>;

    const handleCreate = (product: IProduct) => {
        setProduct(product);
        setValue('name', product.name);
        setButtonText('Добавить');
        product.price ? setValue('price', product.price / 100) : setValue('price', 0);
        setActivePopup(true);
    };

    const handleUpdate = (product: IInventoryProduct) => {
        setProduct(product);
        setValue('name', product.name);
        setButtonText('Обновить');
        setValue('price', product.price);
        setValue('quantity', product.quantity);
        setValue('id', product.id);
        setActivePopup(true);
    };

    const showPopover = () => {
        setSearch('');
    };

    const showPopup = () => {
        setActivePopup((prevState) => !prevState);
    };

    const onSubmit = async (data: FieldValues) => {
        const product = { product: data };
        await updateList({ product, docNumber: docNumber }).unwrap();
        reset();
        if (!updateError) showPopup();
    };
    return (
        <>
            <div className="input-area" ref={setReference}>
                <SearchInput searchFunction={getGoods} loading={isFetching} />
            </div>
            <InventoryCard onClick={(product) => handleUpdate(product)} />
            {goods && goods?.length !== 0 && (
                <Popover
                    isOpened={activePopover}
                    onClose={showPopover}
                    reference={reference}
                    key={'key'}
                    placement={'bottom-start'}
                >
                    <DropdownWindow>
                        <ProductList
                            products={goods}
                            selectField={false}
                            avatar={false}
                            count={false}
                            onClick={(product) => handleCreate(product)}
                        />
                    </DropdownWindow>
                </Popover>
            )}
            <OverlayingPopup isOpened={activePopup} onClose={showPopup}>
                <div className="popup__addProduct">
                    {product && (
                        <PopupCard
                            product={product}
                            register={register}
                            fields={{ priceName: 'price', quantityName: 'quantity' }}
                        />
                    )}
                    <button className="submit-button" onClick={handleSubmit(onSubmit)}>
                        {buttonText}
                    </button>
                    {updateError && <div className="error-message">Произошла ошибка при отправке данных</div>}
                </div>
            </OverlayingPopup>
        </>
    );
};

export default InventoryEdit;
