import { createContext } from 'react';

export interface UserSettingsContextProps {
   sidebar?: {
     collapsed?: boolean,
     hidden?: boolean,
     changeCollapsed?: () => void
     changeHidden?: () => void
   }
}

export const UserSettingsContext = createContext<UserSettingsContextProps>({});
