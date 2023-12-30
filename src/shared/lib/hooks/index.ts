import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../store/types';
export { useResize } from './useResize/useResize';
export { useAsyncLoad } from './useAsyncLoad/useAsyncLoad';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useKeyPress } from './useKeyPress/useKeyPress';