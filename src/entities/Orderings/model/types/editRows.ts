import { ReactNode } from 'react';

type EditRowsArgs = {
  category: string | null;
  rowsCount?: number;
};

export type EditRows = (data: EditRowsArgs) => ReactNode;
