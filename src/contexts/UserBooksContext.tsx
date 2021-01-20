import * as React from 'react';
import {createContext, useContext} from 'react';
import {usePersistedState, PersistedState} from '../hooks/UsePersistedState';
import {WotvDumpContext} from './WotvDumpContext';

export interface Book {
    key: string;
    value: string;
};

export interface UserBookValues {
    current: number | null;
    totalNeeded: number | null;
};

export interface UserBookMap {
    [book: string]: UserBookValues;
};

export const UserBooksContext = createContext<PersistedState<UserBookMap>>([null, null]);

export const UserBooksProvider = (props) => {
    const {itemBookMap} = useContext(WotvDumpContext);
    const itemBooks = Object.keys(itemBookMap)

    const initialUserBooksMap: UserBookMap = itemBooks.reduce((acc: UserBookMap, curr: string): UserBookMap => {
        acc[curr] = {
            current: null,
            totalNeeded: null,
        };
    
        return acc;
    }, {} as UserBookMap);

    const defaultContext: PersistedState<UserBookMap> = usePersistedState<UserBookMap>('userBooks', initialUserBooksMap);

    return (
        <UserBooksContext.Provider value={defaultContext}>
            {props.children}
        </UserBooksContext.Provider>
    );
};