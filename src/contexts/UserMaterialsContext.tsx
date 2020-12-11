import * as React from 'react';
import {createContext, useContext, Dispatch, SetStateAction} from 'react';
import {usePersistedState, PersistedState} from '../hooks/UsePersistedState';
import {WotvDumpContext} from './WotvDumpContext';

export interface Material {
    key: string;
    value: string;
};

export interface MaterialMap {
    [material: string]: number | null;
};

export const UserMaterialsContext = createContext<PersistedState<MaterialMap>>([null, null]);

export const UserMaterialsProvider = (props) => {
    const {itemMaterials} = useContext(WotvDumpContext);

    const initialUserMaterialsMap: MaterialMap = itemMaterials.reduce((acc: MaterialMap, curr: Material): MaterialMap => {
        acc[curr.key] = null;
    
        return acc;
    }, {}) as MaterialMap;

    const defaultContext: PersistedState<MaterialMap> = usePersistedState<MaterialMap>('userMaterials', initialUserMaterialsMap);

    return (
        <UserMaterialsContext.Provider value={defaultContext}>
            {props.children}
        </UserMaterialsContext.Provider>
    );
};