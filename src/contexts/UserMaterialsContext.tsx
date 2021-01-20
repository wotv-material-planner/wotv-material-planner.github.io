import * as React from 'react';
import {createContext, useContext} from 'react';
import {usePersistedState, PersistedState} from '../hooks/UsePersistedState';
import {WotvDumpContext} from './WotvDumpContext';

export interface Material {
    key: string;
    value: string;
};

export interface UserMaterialValues {
    current: number | null;
    totalNeeded: number | null;
};

export interface UserMaterialMap {
    [material: string]: UserMaterialValues;
};

export const UserMaterialsContext = createContext<PersistedState<UserMaterialMap>>([null, null]);

export const UserMaterialsProvider = (props) => {
    const {itemMaterialMap} = useContext(WotvDumpContext);
    const itemMaterials = Object.keys(itemMaterialMap);

    const initialUserMaterialsMap: UserMaterialMap = itemMaterials.reduce((acc: UserMaterialMap, curr: string): UserMaterialMap => {
        acc[curr] = {
            current: null,
            totalNeeded: null,
        };
    
        return acc;
    }, {} as UserMaterialMap);

    const defaultContext: PersistedState<UserMaterialMap> = usePersistedState<UserMaterialMap>('userMaterials', initialUserMaterialsMap);

    return (
        <UserMaterialsContext.Provider value={defaultContext}>
            {props.children}
        </UserMaterialsContext.Provider>
    );
};