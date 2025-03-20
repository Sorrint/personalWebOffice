import { Outlet } from 'react-router-dom';

import { type INavLinkObject } from '@shared/types/navLinkTypes';
import { AppBody, AppHeader } from '@shared/layouts';
import { Dropdown, type DropdownItem } from '@shared/ui/dropdown';
import { SaveOrderingToXLSX } from '@features/saveOrderingToXLSX';
import { AppLink } from '@shared/ui/appLink';
import { AppRoutes } from '@shared/config/router';
import style from './documentsPage.module.scss';

const navLinks: INavLinkObject = {
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
