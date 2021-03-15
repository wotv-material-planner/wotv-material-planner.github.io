import * as React from 'react';
import {FunctionComponent} from 'react';
import {UserBooksProvider} from './UserBooksContext';
import {UserCraftingItemsProvider} from './UserCraftingItemsContext';
import {UserMaterialsProvider} from './UserMaterialsContext';
import {UserRecipesProvider} from './UserRecipesContext';

export interface Ingredient {
    key: string;
    value: string;
};

export interface UserIngredientValues {
    current: number | null;
    totalNeeded: number | null;
};

export interface UserIngredientMap {
    [ingredient: string]: UserIngredientValues;
};

export const UserDataProvider: FunctionComponent = (props) => {
    return (
        <UserBooksProvider>
            <UserMaterialsProvider>
                <UserRecipesProvider>
                    <UserCraftingItemsProvider>
                        {props.children}
                    </UserCraftingItemsProvider>
                </UserRecipesProvider>
            </UserMaterialsProvider>
        </UserBooksProvider>
    );
};