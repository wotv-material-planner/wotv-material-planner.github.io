import * as React from 'react';
import {createContext, useContext} from 'react';
import {usePersistedState, PersistedState} from '../hooks/UsePersistedState';
import {UserIngredientMap} from './UserDataProvider';
import {WotvDumpContext} from './WotvDumpContext';

export const UserMaterialsContext = createContext<PersistedState<UserIngredientMap>>([null, null]);

export const UserMaterialsProvider = (props) => {
    const {itemMaterialMap} = useContext(WotvDumpContext);
    const itemMaterials = Object.keys(itemMaterialMap);

    const initialUserMaterialsMap: UserIngredientMap = itemMaterials.reduce((acc: UserIngredientMap, curr: string): UserIngredientMap => {
        acc[curr] = {
            current: null,
            totalNeeded: null,
        };
    
        return acc;
    }, {});

    const defaultContext: PersistedState<UserIngredientMap> = usePersistedState<UserIngredientMap>('userMaterials', initialUserMaterialsMap);

    return (
        <UserMaterialsContext.Provider value={defaultContext}>
            {props.children}
        </UserMaterialsContext.Provider>
    );
};