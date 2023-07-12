export type { ReducersList } from './../../shared/lib/components/AsyncReduxComponent/AsyncReduxComponent';
export { orderActions, orderReducer } from './model/slices/OrderSlice';

export { getCurrentOrder } from './model/selectors/getCurrentOrderSelector/getCurrentOrderSelector';

export type { OrderState } from './model/types/IOrder';
// export { getCurrentOrder, setCurrentOrder } from '@entities/orders/model/slices/OrderSlice';
export { OrderCard } from './components/orderCard/orderCard';
export { OrderControls } from './components/orderControls/orderControls';
