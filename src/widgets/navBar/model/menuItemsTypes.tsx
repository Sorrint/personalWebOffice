export interface IMenuItem {
    id: string;
    text: string;
    image: string;
    path: string;
    wrapperClassName?: string;
}

export interface IMenuItems {
    id: string;
    wrapperClassName?: string;
    items: IMenuItem[];
}
