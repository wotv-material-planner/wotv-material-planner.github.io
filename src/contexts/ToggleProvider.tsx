import * as React from 'react';
import {FunctionComponent} from 'react';
import {BooksListToggleProvider} from './BooksListToggleContext';
import {MaterialsListToggleProvider} from './MaterialsListToggleContext';

export const ToggleProvider: FunctionComponent = (props) => {
    return (
        <BooksListToggleProvider>
            <MaterialsListToggleProvider>
                {props.children}
            </MaterialsListToggleProvider>
        </BooksListToggleProvider>
    );
};