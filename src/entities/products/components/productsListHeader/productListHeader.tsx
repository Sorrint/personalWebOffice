import styles from './productsListHeader.module.scss';

interface ProductListHeaderProps {
    selectField: boolean
    avatar: boolean
    count: boolean
}

export const ProductListHeader = ({ selectField, avatar, count }: ProductListHeaderProps) => {
    return (
        <>
            <div className={styles.header}>
                {selectField && <div className={styles.select}></div>}
                {avatar && <div className={styles.avatar}></div>}
                <div className={styles.name}>Наименование</div>
                <div className={styles.price}>Цена</div>
                {count && <div className={styles.count}>Остаток</div>}
            </div>
        </>
    );
};
