import * as React from 'react';
import {createContext, useContext, Dispatch, SetStateAction} from 'react';
import {usePersistedState, PersistedState} from '../hooks/UsePersistedState';
import {UserIngredientMap} from './UserDataProvider';
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

export const UserRecipesContext = createContext<PersistedState<UserIngredientMap>>([null, null]);

export const UserRecipesProvider = (props) => {
    const {itemRecipeMap} = useContext(WotvDumpContext);
    const itemRecipes = Object.keys(itemRecipeMap);

    const initialUserRecipesMap: UserIngredientMap = itemRecipes.reduce((acc: UserIngredientMap, curr: string): UserIngredientMap => {
        acc[curr] = {
            current: null,
            totalNeeded: null,
        };
    
        return acc;
    }, {});

    const defaultContext: PersistedState<UserIngredientMap> = usePersistedState<UserIngredientMap>('userRecipes', initialUserRecipesMap);

    return (
        <UserRecipesContext.Provider value={defaultContext}>
            {props.children}
        </UserRecipesContext.Provider>
    );
};