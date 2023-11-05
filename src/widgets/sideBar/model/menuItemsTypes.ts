import { type IconName } from '@shared/ui/iconFont/IconFont';

export interface IMenuItem {
    id: string;
    text: string;
    image: IconName;
    path: string;
    wrapperClassName?: string;
}

export interface IMenuItems {
    id: string;
    wrapperClassName?: string;
    items: IMenuItem[];
}
