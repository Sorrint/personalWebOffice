import { type Database } from '../consts/databaseConsts';

export interface Profile {
    name: string
    email: string
    currentBase: Database
}
