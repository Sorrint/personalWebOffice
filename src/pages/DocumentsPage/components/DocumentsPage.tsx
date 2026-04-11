import { Outlet } from 'react-router-dom';

import { type NavLinkObject } from '@shared/types/navLinkTypes';
import { AppBody, AppHeader } from '@shared/layouts';
import { Dropdown, type DropdownItem } from '@shared/ui/Dropdown';
import { SaveOrderingToXLSX } from '@features/SaveOrderingToXLSX';
import { AppLink } from '@shared/ui/AppLink';
import { AppRoutes } from '@shared/config/router';
import style from './DocumentsPage.module.scss';

const navLinks: NavLinkObject = {
  order: {
    path: '/office/documents/orders',
    title: 'Заказы',
  },
  ordering: {
    path: '/office/documents/orderings',
    title: 'Порядовки',
  },
  distribution: {
    path: '/office/documents/distributions',
    title: 'Распаллетовки',
  },
};

const DocumentsPage = () => {
  const items: DropdownItem[] = [
    { _id: 1, content: <SaveOrderingToXLSX className={style['list-item']} /> },
    { _id: 2, content: <AppLink to={AppRoutes.getOrderCreateRoute()}>Создать заказ</AppLink> },
  ];

  const renderBtn = () => {
    return <Dropdown title='Меню' options={items}></Dropdown>;
  };

  return (
    <>
      <AppHeader title='Документы' renderBtn={renderBtn}>
        <AppHeader.Tabs navLinks={navLinks} />
      </AppHeader>
      <AppBody>
        <Outlet />
      </AppBody>
    </>
  );
};

export default DocumentsPage;
