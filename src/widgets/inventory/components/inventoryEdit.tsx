import { FC, useEffect, useState, useRef } from 'react';
import { FieldValues } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { InventoryCard, inventoryDocsAPI } from '../../../entities/inventoryDocs';
import { ProductList, productsAPI } from '../../../entities/products';
import { IInventoryProduct } from '../../../entities/inventoryDocs/model/types';
import { IProduct } from '../../../entities/products/model/IProducts';
import { useKeyPress } from '../../../shared/lib/hooks/useKeyPress/useKeyPress';

import Popover from '../../../features/popover/popover';
import { OverlayingPopup } from '../../../features/popup';
import PopupCard from '../../../features/popup/popupCard/popupCard';
import SearchInput from '../../../features/search/searchInput';

import DropdownWindow from '../../../shared/ui/dropdownList/dropdownWindow';
import './acceptanceDocs.scss';

interface IPopupProps {
    product: IInventoryProduct;
    popupText: string;
    buttonText: string;
    method: 'Delete' | 'Update' | 'Create';
}

const InventoryEdit: FC = () => {
    const { number } = useParams();
    const docNumber = Number(number);
    const [popupProps, setPopupProps] = useState<IPopupProps>();
    const [updateList, { error: updateError }] = inventoryDocsAPI.useUpdateProductsMutation();
    const [removeProduct, { error: removeError }] = inventoryDocsAPI.useRemoveInventoryProductMutation();
    const [search, setSearch] = useState<string>('');

    //Загрузка данных
    const {
        data: goods,
        isLoading: goodsLoading,
        isFetching
    } = productsAPI.useLoadProductBySearchQuery({ limit: 1000, q: search });

    //состояния popup && popover
    const [activePopover, setActivePopover] = useState<boolean>(true);
    const [activePopup, setActivePopup] = useState<boolean>(false);
    const reference = useRef<HTMLDivElement>(null);
    const searchInput = useRef<HTMLInputElement>(null);
    const { isKeyPressed, setIsKeyPressed } = useKeyPress('Escape');
    useEffect(() => {
        setIsKeyPressed(false);
        setActivePopup(false);
    }, [isKeyPressed]);
    useEffect(() => {
        goods && setActivePopover(goods?.length > 0);
    }, [goods]);
    useEffect(() => {
        searchInput && !activePopup && searchInput.current?.focus();
    }, [activePopup]);

    const getGoods = async (value: string) => {
        setSearch(value);
    };

    const showPopup = () => {
        setActivePopup((prevState) => !prevState);
    };

    const showPopover = () => {
        setSearch('');
    };
    const handleCreate = (product: IProduct) => {
        const { name, price } = product;
        const newProduct = { name, price: price && price / 100, quantity: 1, id: undefined };
        setPopupProps({ product: newProduct, buttonText: 'Добавить', popupText: '', method: 'Create' });
        setActivePopup(true);
    };

    const handleUpdate = (product: IInventoryProduct) => {
        setPopupProps({ product, buttonText: 'Обновить', popupText: '', method: 'Update' });
        setActivePopup(true);
    };

    const handleDelete = (product: IInventoryProduct) => {
        setPopupProps({ product, buttonText: 'Удалить', popupText: 'Вы уверены?', method: 'Delete' });
        setActivePopup(true);
    };

    const onSubmit = async (data: FieldValues) => {
        if (popupProps) {
            const { method, product } = popupProps;
            method === 'Delete'
                ? await removeProduct({ id: product.id, docNumber: docNumber }).unwrap()
                : await updateList({ product: { product: { ...data } }, docNumber: docNumber }).unwrap();
        }

        if (!updateError) showPopup();
    };

    if (goodsLoading) return <h1>Идет загрузка</h1>;

    return (
        <>
            <span className="input-area" ref={reference}>
                <SearchInput searchFunction={getGoods} loading={isFetching} inputRef={searchInput} />
            </span>
            <InventoryCard onClick={(product) => handleUpdate(product)} onDelete={(product) => handleDelete(product)} />
            {goods && goods?.length !== 0 && reference.current && (
                <Popover
                    isOpened={activePopover}
                    onClose={showPopover}
                    reference={reference.current as HTMLElement}
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
                {popupProps && <PopupCard {...popupProps} buttonClick={onSubmit} error={updateError} />}
            </OverlayingPopup>
        </>
    );
};

export default InventoryEdit;
