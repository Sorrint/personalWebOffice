export interface IMenuItem {
    id: string;
    text: string;
    image: React.FC<React.SVGProps<SVGElement>>;
    path: string;
    wrapperClassName?: string;
}

export interface IMenuItems {
    id: string;
    wrapperClassName?: string;
    items: IMenuItem[];
}
