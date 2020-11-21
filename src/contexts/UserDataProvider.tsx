import * as React from 'react';
import {FunctionComponent} from 'react';
import {UserBooksProvider} from './UserBooksContext';

export const UserDataProvider: FunctionComponent = (props) => {
    return (
        <UserBooksProvider>
            {props.children}
        </UserBooksProvider>
    );
}