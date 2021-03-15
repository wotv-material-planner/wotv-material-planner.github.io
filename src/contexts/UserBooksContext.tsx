import * as React from 'react';
import {createContext, useContext} from 'react';
import {usePersistedState, PersistedState} from '../hooks/UsePersistedState';
import {UserIngredientMap} from './UserDataProvider';
import {WotvDumpContext} from './WotvDumpContext';

export interface Book {
    key: string;
    value: string;
};

export const UserBooksContext = createContext<PersistedState<UserIngredientMap>>([null, null]);

export const UserBooksProvider = (props) => {
    const {itemBookMap} = useContext(WotvDumpContext);
    const itemBooks = Object.keys(itemBookMap)

    const initialUserBooksMap: UserIngredientMap = itemBooks.reduce((acc: UserIngredientMap, curr: string): UserIngredientMap => {
        acc[curr] = {
            current: null,
            totalNeeded: null,
        };
    
        return acc;
    }, {});

    const defaultContext: PersistedState<UserIngredientMap> = usePersistedState<UserIngredientMap>('userBooks', initialUserBooksMap);

    return (
        <UserBooksContext.Provider value={defaultContext}>
            {props.children}
        </UserBooksContext.Provider>
    );
};