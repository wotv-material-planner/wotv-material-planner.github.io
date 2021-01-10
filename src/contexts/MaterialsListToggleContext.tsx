import * as React from 'react';
import {createContext} from 'react';
import {usePersistedState, PersistedState} from '../hooks/UsePersistedState';

export const MaterialsListToggleContext = createContext<PersistedState<boolean>>([null, null]);

export const MaterialsListToggleProvider = (props) => {
    const defaultContext: PersistedState<boolean> = usePersistedState<boolean>('MaterialsListToggle', true);

    return (
        <MaterialsListToggleContext.Provider value={defaultContext}>
            {props.children}
        </MaterialsListToggleContext.Provider>
    );
};