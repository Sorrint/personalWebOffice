import { IPackage } from '../../model/packagesTypes';
import { AppLinkItem } from '@shared/ui/AppLinksList';

export const transformPackagesList = (list: IPackage[]): AppLinkItem[] =>
  list.map(({ _id: id, name }) => {
    return {
      id,
      title: name,
      to: `./${id}`,
    };
  });
