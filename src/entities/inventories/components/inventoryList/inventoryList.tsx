import { memo } from 'react';
import { AppLinkItem, AppLinksList } from '@shared/ui/AppLinksList';

interface InventoryListProps {
  documents: AppLinkItem[];
}

export const InventoryList = memo(({ documents }: InventoryListProps) => (
  <AppLinksList list={documents} listTitle='Список документов' />
));

InventoryList.displayName = 'InventoryList';
