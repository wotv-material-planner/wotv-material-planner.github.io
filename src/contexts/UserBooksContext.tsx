import * as React from 'react';
import {createContext, useContext, Dispatch, SetStateAction} from 'react';
import {usePersistedState, PersistedState} from '../hooks/UsePersistedState';
import {WotvDumpContext} from './WotvDumpContext';

export interface Book {
    key: string;
    value: string;
};

export interface BookMap {
    [book: string]: number | null;
};

export const UserBooksContext = createContext<PersistedState<BookMap>>([null, null]);

export const UserBooksProvider = (props) => {
    const {itemBooks} = useContext(WotvDumpContext);

    const initialUserBooksMap: BookMap = itemBooks.reduce((acc: BookMap, curr: Book): BookMap => {
        acc[curr.key] = null;
    
        return acc;
    }, {}) as BookMap;

    const defaultContext: PersistedState<BookMap> = usePersistedState<BookMap>('userBooks', initialUserBooksMap);

    return (
        <UserBooksContext.Provider value={defaultContext}>
            {props.children}
        </UserBooksContext.Provider>
    );
};