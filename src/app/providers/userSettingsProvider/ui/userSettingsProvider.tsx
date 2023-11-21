import { useState, type ReactNode } from 'react';
import { UserSettingsContext } from '@shared/lib/context/settingsContext';

interface ErrorProviderProps {
    children: ReactNode
}
export const UserSettingsProvider = ({children}: ErrorProviderProps) => {
    const {0: collapsed, 1: setCollapsed} = useState<boolean>(false)
  
    const changeSidebar = () => {
        setCollapsed(prev => !prev)
    }

    return <UserSettingsContext.Provider 
        value={
            {sidebar: {
                collapsed: collapsed, 
                changeCollapsed: changeSidebar
            }}
        }> 
        {children}
    </UserSettingsContext.Provider>;
};