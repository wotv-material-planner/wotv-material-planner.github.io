import * as React from 'react';
import {createContext, useContext, Dispatch, SetStateAction} from 'react';
import {usePersistedState, PersistedState} from '../hooks/UsePersistedState';
import {WotvDumpContext} from './WotvDumpContext';

export interface Recipe {
    iname: string;
    name: string;
    type: number;
    rare: number;
    steal: number;
    coin: number;
    ac: number;
    mc: number;
    buy: number;
    sell: number;
    icon: string;
};

export interface UserRecipeValues {
    current: number | null;
    totalNeeded: number | null;
};

export interface UserRecipeMap {
    [recipe: string]: UserRecipeValues;
};

export const UserRecipesContext = createContext<PersistedState<UserRecipeMap>>([null, null]);

export const UserRecipesProvider = (props) => {
    const {itemRecipeMap} = useContext(WotvDumpContext);
    const itemRecipes = Object.keys(itemRecipeMap);

    const initialUserRecipesMap: UserRecipeMap = itemRecipes.reduce((acc: UserRecipeMap, curr: string): UserRecipeMap => {
        acc[curr] = {
            current: null,
            totalNeeded: null,
        };
    
        return acc;
    }, {} as UserRecipeMap);

    const defaultContext: PersistedState<UserRecipeMap> = usePersistedState<UserRecipeMap>('userRecipes', initialUserRecipesMap);

    return (
        <UserRecipesContext.Provider value={defaultContext}>
            {props.children}
        </UserRecipesContext.Provider>
    );
};