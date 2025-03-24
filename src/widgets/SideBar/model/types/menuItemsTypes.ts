import { type IconName } from '@shared/ui/IconFont';

export interface MenuItem {
  id?: string;
  text: string;
  image?: IconName;
  path: string;
  wrapperClassName?: string;
  authOnly?: boolean;
}

export interface MenuItems {
  section: string;
  items: MenuItem[];
  grow?: boolean;
}
