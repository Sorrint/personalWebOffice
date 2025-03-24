import { AppRoutes } from '@shared/config/router';
import { AppBody, AppHeader } from '@shared/layouts';
import { NavLinkObject } from '@shared/types/navLinkTypes';
import { Outlet } from 'react-router-dom';

const navLinks: NavLinkObject = {
  packages: {
    path: AppRoutes.getPackagesRoute(),
    title: 'Упаковка',
  },
  ordering: {
    path: AppRoutes.getPackagesCategoryCreateRoute(),
    title: 'Категории упаковки',
  },
};

const PackagesPage = () => {
  return (
    <>
      <AppHeader title='Упаковка'>
        <AppHeader.Tabs navLinks={navLinks} />
      </AppHeader>
      <AppBody>
        <Outlet />
      </AppBody>
    </>
  );
};

export default PackagesPage;
