import { createContext } from 'react';

export interface UserSettingsContextProps {
   sidebar?: {
     collapsed?: boolean,
     changeCollapsed?: () => void
   }
}

export const UserSettingsContext = createContext<UserSettingsContextProps>({});
