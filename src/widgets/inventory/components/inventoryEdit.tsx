import { FC, useEffect, useState, useRef, KeyboardEvent } from 'react';
import { FieldValues } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { PopupCard } from 'features/popup';
import SearchInput from 'features/search';
import { PopoverNew } from 'features/popover';
import OverlayingPopupWithFocusTrap from 'features/popup/overlayingPopup/overlayingPopupWithFocusTrap';

import { InventoryContent, inventoryDocsAPI } from 'entities/inventoryDocs';
import { ProductList, productsAPI } from 'entities/products';
import { IInventoryProduct } from 'entities/inventoryDocs/model/types';
import { IProduct } from 'entities/products/model/IProducts';
import { useKeyPress } from 'shared/lib/hooks/useKeyPress/useKeyPress';
import DropdownList from 'shared/ui/dropdownList';

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
    const [activePopover, setActivePopover] = useState<boolean>(false);
    const [activePopup, setActivePopup] = useState<boolean>(false);
    const reference = useRef<HTMLDivElement>(null);
    const searchInput = useRef<HTMLInputElement>(null);
    const firstElement = useRef<HTMLDivElement | null>(null);
    const { isKeyPressed, setIsKeyPressed } = useKeyPress('Escape');
    useEffect(() => {
        setIsKeyPressed(false);
        setActivePopup(false);
        setActivePopover(false);
    }, [isKeyPressed]);
    useEffect(() => {
        goods && setActivePopover(goods?.length > 0);
    }, [goods]);
    useEffect(() => {
        searchInput && !activePopup && searchInput.current?.focus();
        searchInput && !activePopover && searchInput.current?.focus();
    }, [activePopup, activePopover]);

    const getGoods = async (value: string) => {
        setActivePopover(false);
        setSearch(value);
    };

    const showPopup = () => {
        setActivePopup((prevState) => !prevState);
    };

    const hidePopover = () => {
        setActivePopover(false);
    };

    const handleCreate = (product: IProduct) => {
        const { name, price } = product;
        const newProduct = { name, price: price && price / 100, quantity: 1, id: undefined };
        setPopupProps({ product: newProduct, buttonText: 'Добавить', popupText: '', method: 'Create' });
        setActivePopover(false);
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

    const handleInputKeydown = (key: KeyboardEvent) => {
        if (key.code === 'ArrowDown' && activePopover === false) {
            goods && setActivePopover(true);
        }
        if (key.code === 'ArrowDown' && activePopover === true && firstElement.current) {
            key.preventDefault();
            firstElement.current.focus();
        }
        if (key.code === 'ArrowUp' && activePopover === true) {
            key.preventDefault();
            setActivePopover(false);
        }
    };

    const setFirstElement = (el: HTMLDivElement) => {
        firstElement.current = el;
    };

    if (goodsLoading) return <h1>Идет загрузка</h1>;

    return (
        <>
            <span className="input-area" ref={reference}>
                <SearchInput
                    searchFunction={getGoods}
                    loading={isFetching}
                    inputRef={searchInput}
                    onKeyDown={handleInputKeydown}
                />
            </span>
            <InventoryContent
                onClick={(product) => handleUpdate(product)}
                onDelete={(product) => handleDelete(product)}
                tabIndex={activePopup ? -1 : 0}
            />
            {goods && goods?.length !== 0 && reference.current && activePopover && (
                <PopoverNew
                    isOpen={activePopover}
                    onClose={hidePopover}
                    referenceElement={reference.current as HTMLElement}
                    key={'key'}
                >
                    <DropdownList>
                        <ProductList
                            products={goods}
                            selectField={false}
                            avatar={false}
                            count={false}
                            onClick={(product) => handleCreate(product)}
                            setFirstElement={setFirstElement}
                            parentRef={searchInput}
                        />
                    </DropdownList>
                </PopoverNew>
            )}
            <OverlayingPopupWithFocusTrap isOpened={activePopup} onClose={showPopup}>
                {popupProps && <PopupCard {...popupProps} buttonClick={onSubmit} error={updateError} />}
            </OverlayingPopupWithFocusTrap>
        </>
    );
};

export default InventoryEdit;
