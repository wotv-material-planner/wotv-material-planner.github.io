import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {BooksList} from './BooksList';
import {UserBooksProvider, wotvBooks} from '../contexts/UserBooksContext';

describe('BooksList', () => {
  it('renders an BooksList', () => {
    renderSubject({});

    expect(screen.getAllByRole('textbox')).toHaveLength(wotvBooks.length);
  });
});

interface OptionalProps {}

const renderSubject = (props: OptionalProps) => {
    return render(
        <UserBooksProvider>
            <BooksList {...makeProps(props)} /> 
        </UserBooksProvider>
    );
}

const makeProps = (props: OptionalProps) => {
  return {};
};