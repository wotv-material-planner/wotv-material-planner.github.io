import * as React from 'react';
import {FunctionComponent} from 'react';
import {UserBooksProvider} from './UserBooksContext';
import {UserMaterialsProvider} from './UserMaterialsContext';

export const UserDataProvider: FunctionComponent = (props) => {
    return (
        <UserBooksProvider>
            <UserMaterialsProvider>
                {props.children}
            </UserMaterialsProvider>
        </UserBooksProvider>
    );
}