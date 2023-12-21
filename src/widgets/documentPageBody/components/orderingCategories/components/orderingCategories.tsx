import { selectAllPackageCategories } from '@entities/packages';
import style from './orderingCategories.module.scss';
import { useAppSelector } from '@shared/lib/hooks';

export const OrderingCategories = () => {
    const categories = useAppSelector(selectAllPackageCategories);
    
    return <>{categories && <div className={style.component}>{categories.map(item => <div key={item._id}>{item.name}</div>)}</div>}</>;
};