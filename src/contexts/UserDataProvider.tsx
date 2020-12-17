import * as React from 'react';
import {FunctionComponent} from 'react';
import {UserBooksProvider} from './UserBooksContext';
import {UserCraftingItemsProvider} from './UserCraftingItemsContext';
import {UserMaterialsProvider} from './UserMaterialsContext';
import {UserRecipesProvider} from './UserRecipesContext';

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