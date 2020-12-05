import * as React from 'react';
import {createContext, useContext, Dispatch, SetStateAction} from 'react';
import {usePersistedState} from '../hooks/UsePersistedState';
import {WotvDumpContext} from './WotvDumpContext';

export interface Recipe {
    key: string;
    value: string;
};

export interface RecipeMap {
    [recipe: string]: number | null;
};

type UserRecipesState = [RecipeMap, Dispatch<SetStateAction<RecipeMap>>];

export const UserRecipesContext = createContext<UserRecipesState>([null, null]);

export const UserRecipesProvider = (props) => {
    const {itemRecipes} = useContext(WotvDumpContext);

    const initialUserRecipesMap: RecipeMap = itemRecipes.reduce((acc: RecipeMap, curr: Recipe): RecipeMap => {
        acc[curr.key] = null;
    
        return acc;
    }, {}) as RecipeMap;

    const defaultContext: UserRecipesState = usePersistedState<RecipeMap>('userRecipes', initialUserRecipesMap);

    return (
        <UserRecipesContext.Provider value={defaultContext}>
            {props.children}
        </UserRecipesContext.Provider>
    );
};