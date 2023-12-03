import { memo, useEffect, useState, useRef, type KeyboardEvent, useCallback } from 'react';
import { type FieldValues } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { type IInventoryProduct, InventoryContent, useUpdateProducts, useRemoveInventoryProduct, useLoadDocumentByNumber } from '@entities/inventoryDocs';
import { type IDreamkasProduct, ProductList, useLoadProductsBySearch, PopupProductCard} from '@entities/products';
import { SearchInput } from '@shared/ui/searchInput';
import { DropdownList } from '@shared/ui/dropdownList';
import { useKeyPress } from '@shared/lib/hooks';
import { PopupWithFocusTrap } from '@shared/ui/popup';

import styles from './inventoryEdit.module.scss';

import { Popover } from '@shared/ui/popover';
interface IPopupProps {
    product: IInventoryProduct
    popupText: string
    buttonText: string
    method: 'Delete' | 'Update' | 'Create'
}

export const InventoryEdit = memo(() => {
    const { number } = useParams();
    if (!number) return null
    const docNumber = Number(number);
    const [popupProps, setPopupProps] = useState<IPopupProps>();
    const [updateList, { error: updateError }] = useUpdateProducts();
    const [removeProduct] = useRemoveInventoryProduct();
    const [search, setSearch] = useState<string>('');
    const { data: inventoryList, isLoading } = useLoadDocumentByNumber(number);

    // Загрузка данных
    const {
        data: goods,
        isFetching
    } = useLoadProductsBySearch({ limit: 1000, q: search });

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

    const handleCreate = useCallback((product: IDreamkasProduct) => {
        const { name, price } = product;
        const newProduct = { name, price: price && price / 100, quantity: 1, id: undefined };
        setActivePopover(false);
        setPopupProps({ product: newProduct, buttonText: 'Добавить', popupText: '', method: 'Create' });
        setActivePopup(true);
    },[]);

    const handleUpdate = useCallback((product: IInventoryProduct) => {
        setPopupProps({ product, buttonText: 'Обновить', popupText: '', method: 'Update' });
        setActivePopup(true);
    },[]);

    const handleDelete = useCallback((product: IInventoryProduct) => {
        setPopupProps({ product, buttonText: 'Удалить', popupText: 'Вы уверены?', method: 'Delete' });
        setActivePopup(true);
    },[]);

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

    if (isLoading) return 'Идет загрузка...'

    return (
        <>
            <SearchInput
                searchFunction={getGoods}
                loading={isFetching}
                inputRef={searchInput}
                onKeyDown={handleInputKeydown}
            />
            <InventoryContent
                onClick={handleUpdate}
                onDelete={handleDelete}
                tabIndex={activePopup ? -1 : 0}
                inventoryList={inventoryList}
                docNumber={number}
            />
            {goods && goods?.length !== 0 && searchInput.current && activePopover && (
                <Popover
                    isOpen={activePopover}
                    onClose={hidePopover}
                    referenceElement={searchInput.current as HTMLElement}
                    key={'key'}
                >
                    <DropdownList className={styles['dropdown-products']}>
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
                </Popover>
            )}
            <PopupWithFocusTrap isOpened={activePopup} onClose={showPopup}>
                {popupProps && <PopupProductCard {...popupProps} buttonClick={onSubmit} error={updateError} />}
            </PopupWithFocusTrap>
        </>
    );
});
