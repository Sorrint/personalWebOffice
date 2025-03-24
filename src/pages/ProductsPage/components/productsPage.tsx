import { Outlet } from 'react-router-dom';

import { AppRibbon } from '@widgets/AppRibbon';
import { AppBody, AppHeader } from '@shared/layouts';
import { type NavLinkObject } from '@shared/types/navLinkTypes';

const ProductsPage = () => {
  const navLinks: NavLinkObject = {
    order: {
      path: '/office/products/categories',
      title: 'Список категорий',
    },
  };

  return (
    <>
      <AppHeader title='Товары'>
        <AppRibbon navLinks={navLinks} />
      </AppHeader>
      <AppBody>
        <Outlet />
      </AppBody>
    </>
  );
};
export default ProductsPage;
