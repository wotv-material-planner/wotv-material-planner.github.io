import * as React from 'react';
import {createContext, Dispatch, SetStateAction} from 'react';
import { usePersistedState } from '../hooks/UsePersistedState';

export interface BookMap {
    [book: string]: number;
};

type UserBooksState = [BookMap, Dispatch<SetStateAction<BookMap>>]

export const wotvBooks = ['sword', 'rod'];

const initialUserBooksMap = wotvBooks.reduce((acc: BookMap, curr: string): BookMap => {
    acc[curr] = null;

    return acc;
}, {} as BookMap);

export const UserBooksContext = createContext<UserBooksState>([null, null]);

export const UserBooksProvider = (props) => {
    const defaultContext: UserBooksState = usePersistedState('userBooks', initialUserBooksMap);

    return (
        <UserBooksContext.Provider value={defaultContext}>
            {props.children}
        </UserBooksContext.Provider>
    );
}