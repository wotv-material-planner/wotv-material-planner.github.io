import * as React from 'react';
import {createContext} from 'react';
import {usePersistedState, PersistedState} from '../hooks/UsePersistedState';

export const BooksListToggleContext = createContext<PersistedState<boolean>>([null, null]);

export const BooksListToggleProvider = (props) => {
    const defaultContext: PersistedState<boolean> = usePersistedState<boolean>('booksListToggle', true);

    return (
        <BooksListToggleContext.Provider value={defaultContext}>
            {props.children}
        </BooksListToggleContext.Provider>
    );
};