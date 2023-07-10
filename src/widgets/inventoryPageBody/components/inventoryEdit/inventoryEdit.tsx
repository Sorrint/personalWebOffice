import { type FC, useEffect, useState, useRef, type KeyboardEvent } from 'react';
import { type FieldValues } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { SearchInput } from '@shared/ui/searchInput';
import { DropdownList } from '@shared/ui/dropdownList';
import { PopoverNew } from '@features/popover';
import { PopupCard } from '@features/popup';
import OverlayingPopupWithFocusTrap from '@features/popup/overlayingPopup/overlayingPopupWithFocusTrap';

import { type IInventoryProduct, InventoryContent, inventoryDocsAPI } from '@entities/inventoryDocs';
import { ProductList, productsAPI } from '@entities/products';
import { type IDreamkasProduct } from '@entities/products/model/interfaces/IDreamkasProduct';
import { useKeyPress } from '@shared/lib/hooks/useKeyPress/useKeyPress';

import './inventoryEdit.scss';
interface IPopupProps {
    product: IInventoryProduct
    popupText: string
    buttonText: string
    method: 'Delete' | 'Update' | 'Create'
}

export const InventoryEdit: FC = () => {
    const { number } = useParams();
    const docNumber = Number(number);
    const [popupProps, setPopupProps] = useState<IPopupProps>();
    const [updateList, { error: updateError }] = inventoryDocsAPI.useUpdateProductsMutation();
    const [removeProduct] = inventoryDocsAPI.useRemoveInventoryProductMutation();
    const [search, setSearch] = useState<string>('');

    // Загрузка данных
    const {
        data: goods,
        isFetching
    } = productsAPI.useLoadProductBySearchQuery({ limit: 1000, q: search });

    // состояния popup && popover
    const [activePopover, setActivePopover] = useState<boolean>(false);
    const [activePopup, setActivePopup] = useState<boolean>(false);
    const searchInput = useRef<HTMLInputElement>(null);
    const firstElement = useRef<HTMLDivElement | null>(null);
    const { isKeyPressed, setIsKeyPressed } = useKeyPress('Escape');
    useEffect(() => {
        setIsKeyPressed(false);
        setActivePopup(false);
        setActivePopover(false);
    }, [isKeyPressed]);
    useEffect(() => {
        if (goods) {
            goods.length === 1 ? handleCreate(goods[0]) : setActivePopover(goods?.length > 0);
        }
    }, [goods]);
    useEffect(() => {
        !activePopup && searchInput.current?.focus();
        !activePopover && searchInput.current?.focus();
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

    const handleCreate = (product: IDreamkasProduct) => {
        const { name, price } = product;
        const newProduct = { name, price: price && price / 100, quantity: 1, id: undefined };
        setActivePopover(false);
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
                ? await removeProduct({ id: product.id, docNumber }).unwrap()
                : await updateList({ product: { ...data }, docNumber }).unwrap();
        }

        if (!updateError) showPopup();
    };

    const handleInputKeydown = (key: KeyboardEvent) => {
        if (key.code === 'ArrowDown' && !activePopover) {
            goods && setActivePopover(true);
        }
        if (key.code === 'ArrowDown' && activePopover && firstElement.current) {
            key.preventDefault();
            firstElement.current.focus();
        }
        if (key.code === 'ArrowUp' && activePopover) {
            key.preventDefault();
            setActivePopover(false);
        }
    };

    const setFirstElement = (el: HTMLDivElement) => {
        firstElement.current = el;
    };

    return (
        <>
            <SearchInput
                searchFunction={getGoods}
                loading={isFetching}
                inputRef={searchInput}
                onKeyDown={handleInputKeydown}
            />
            <InventoryContent
                onClick={(product) => { handleUpdate(product); }}
                onDelete={(product) => { handleDelete(product); }}
                tabIndex={activePopup ? -1 : 0}
            />
            {goods && goods?.length !== 0 && searchInput.current && activePopover && (
                <PopoverNew
                    isOpen={activePopover}
                    onClose={hidePopover}
                    referenceElement={searchInput.current as HTMLElement}
                    key={'key'}
                >
                    <DropdownList className='dropdown-products'>
                        <ProductList
                            products={goods}
                            selectField={false}
                            avatar={false}
                            count={false}
                            onClick={(product) => { handleCreate(product); }}
                            setFirstElement={setFirstElement}
                            parentRef={searchInput}
                            displayHeaders={false}
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
