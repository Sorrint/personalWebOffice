import { createContext } from 'react';

export interface AuthContextProps {
    email?: string;
    name?: string;
    refetch?: () => void
}

export const AuthContext = createContext<AuthContextProps>({});
