import * as React from 'react';
import {FunctionComponent} from 'react';
import {BooksListToggleProvider} from './BooksListToggleContext';

export const ListToggleProvider: FunctionComponent = (props) => {
    return (
        <BooksListToggleProvider>
            {props.children}
        </BooksListToggleProvider>
    );
};