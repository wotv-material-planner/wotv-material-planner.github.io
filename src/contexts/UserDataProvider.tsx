import * as React from 'react';
import {FunctionComponent} from 'react';
import {UserBooksProvider} from './UserBooksContext';
import {UserMaterialsProvider} from './UserMaterialsContext';
import {UserRecipesProvider} from './UserRecipesContext';

export const UserDataProvider: FunctionComponent = (props) => {
    return (
        <UserBooksProvider>
            <UserMaterialsProvider>
                <UserRecipesProvider>
                    {props.children}
                </UserRecipesProvider>
            </UserMaterialsProvider>
        </UserBooksProvider>
    );
}