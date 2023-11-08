import { createContext } from 'react';

export interface AuthContextProps {
    user?: string;
    email?: string;
    name?: string;
    refetch?: () => void
}

export const AuthContext = createContext<AuthContextProps>({});
