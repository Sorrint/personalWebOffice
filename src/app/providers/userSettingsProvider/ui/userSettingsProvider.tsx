import { useState, type ReactNode } from 'react';
import { UserSettingsContext } from '@shared/lib/context/settingsContext';

interface ErrorProviderProps {
    children: ReactNode
}
export const UserSettingsProvider = ({children}: ErrorProviderProps) => {
    const {0: collapsed, 1: setCollapsed} = useState<boolean>(false)
    const {0: openSidebar, 1:setOpenSidebar} = useState(false)
  
    const changeSidebar = () => {
        setCollapsed(prev => !prev)
    }

    const hideSidebar = () => {
        setOpenSidebar(prev => !prev)
    }

    return <UserSettingsContext.Provider 
        value={
            {sidebar: {
                collapsed: collapsed,
                hidden: openSidebar,
                changeCollapsed: changeSidebar,
                changeHidden: hideSidebar
            }}
        }> 
        {children}
    </UserSettingsContext.Provider>;
};