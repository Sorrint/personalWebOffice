import { type Package } from '../../model/packagesTypes';
import { type AppLinkItem } from '@shared/ui/AppLinksList';

export const transformPackagesList = (list: Package[]): AppLinkItem[] =>
  list.map(({ _id: id, name }) => {
    return {
      id,
      title: name,
      to: `./${id}`,
    };
  });
