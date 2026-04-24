import { Outlet } from 'react-router-dom';

import { AppRibbon } from '@widgets/AppRibbon';

import { AppBody, AppHeader } from '@shared/layouts';
import { type NavLinkObject } from '@shared/types/navLinkTypes';
import { AsyncReduxComponent, type ReducersList } from '@shared/lib/components';
import { tokenReducer } from '@shared/lib/store';

const reducers: ReducersList = {
  tokens: tokenReducer,
};

const navLinks: NavLinkObject = {
  order: {
    path: '/office/inventories/',
    title: 'Список документов',
  },
};

const InventoryPage = () => {
  return (
    <AsyncReduxComponent reducersList={reducers}>
      <AppHeader title='Инвентаризация'>
        <AppRibbon navLinks={navLinks} />
      </AppHeader>
      <AppBody>
        <Outlet />
      </AppBody>
    </AsyncReduxComponent>
  );
};
export default InventoryPage;
