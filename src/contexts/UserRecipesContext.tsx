import * as React from 'react';
import {createContext, useContext, Dispatch, SetStateAction} from 'react';
import {usePersistedState, PersistedState} from '../hooks/UsePersistedState';
import {WotvDumpContext} from './WotvDumpContext';

export interface Recipe {
    iname: string;
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

export interface RecipeMap {
    [recipe: string]: UserRecipeValues;
};

export const UserRecipesContext = createContext<PersistedState<RecipeMap>>([null, null]);

export const UserRecipesProvider = (props) => {
    const {itemRecipes} = useContext(WotvDumpContext);

    const initialUserRecipesMap: RecipeMap = itemRecipes.reduce((acc: RecipeMap, curr: Recipe): RecipeMap => {
        acc[curr.iname] = {
            current: null,
            totalNeeded: null,
        };
    
        return acc;
    }, {}) as RecipeMap;

    const defaultContext: PersistedState<RecipeMap> = usePersistedState<RecipeMap>('userRecipes', initialUserRecipesMap);

    return (
        <UserRecipesContext.Provider value={defaultContext}>
            {props.children}
        </UserRecipesContext.Provider>
    );
};