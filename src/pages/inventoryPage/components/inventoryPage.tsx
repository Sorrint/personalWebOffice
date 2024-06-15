import { Outlet } from 'react-router-dom';

import { AppRibbon } from '@widgets/appRibbon';
import { AppBody, AppHeader } from '@shared/layouts';
import { type INavLinkObject } from '@shared/types/navLinkTypes';
import { tokenReducer } from '@shared/lib/store';
import { AsyncReduxComponent, type ReducersList } from '@shared/lib/components';

const reducers: ReducersList = {
  tokens: tokenReducer,
};
const InventoryPage = () => {
  const navLinks: INavLinkObject = {
    order: {
      path: '/office/inventory-lists/documents',
      title: 'Список документов',
    },
  };

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
