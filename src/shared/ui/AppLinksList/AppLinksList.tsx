import { memo } from 'react';
import { Grid } from '@shared/ui/Grid';
import { AppLink } from '@shared/ui/AppLink';

export interface AppLinkItem {
  title: string;
  to: string;
  id: string;
}

interface AppLinksListProps<T extends AppLinkItem> {
  list: T[];
  listTitle?: string;
}
export const AppLinksList = memo(
  <T extends AppLinkItem>({ list, listTitle }: AppLinksListProps<T>) => {
    return (
      <Grid>
        {listTitle && <h2>{listTitle}</h2>}
        {list.map(({ id, title, to }) => (
          <AppLink key={id} to={to} variant='panel'>
            {title}
          </AppLink>
        ))}
      </Grid>
    );
  },
);
