import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {BooksList} from './BooksList';
import {UserBooksProvider} from '~/contexts/UserBooksContext';
import {defaultContext} from '~/contexts/WotvDumpContext';

describe('BooksList', () => {
    it('renders an BooksList', () => {
        renderSubject({});
        const {itemBooks} = defaultContext;

        expect(screen.getAllByRole('textbox')).toHaveLength(itemBooks.length);
    });
});

interface OptionalProps {};

const renderSubject = (props: OptionalProps) => {
    return render(
        <UserBooksProvider>
            <BooksList {...makeProps(props)} /> 
        </UserBooksProvider>
    );
};

const makeProps = (props: OptionalProps) => {
    return {};
};