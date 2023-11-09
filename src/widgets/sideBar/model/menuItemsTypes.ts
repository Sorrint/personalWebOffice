import { type IconName } from '@shared/ui/iconFont';

export interface IMenuItem {
    id: string;
    text: string;
    image?: IconName;
    path: string;
    wrapperClassName?: string;
}

export interface IMenuItems {
    section: string;
    items: IMenuItem[];
    grow?: boolean;
}
