import { type ReactNode } from 'react';

interface IListProps<T> {
    items: T[]
    renderItem: (item: T) => ReactNode
}

export function List<T> (props: IListProps<T>) {
    return <>{props.items.map(props.renderItem)}</>;
}
