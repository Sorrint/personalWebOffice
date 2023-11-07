import { createContext } from 'react';

export interface AuthContextProps {
    user?: string;
    refetch?: () => void
}

export const AuthContext = createContext<AuthContextProps>({});
