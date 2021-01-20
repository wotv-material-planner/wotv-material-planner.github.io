import * as React from 'react';
import {FunctionComponent, useContext, ChangeEvent} from 'react';
import {Book, BookMap, UserBooksContext} from '~/contexts/UserBooksContext';
import {WotvDumpContext} from '~/contexts/WotvDumpContext';
import {IngredientEntry} from '~/components/common/IngredientEntry';
import './BooksList.scss'

export const BooksList: FunctionComponent = () => {
    const {itemBooks} = useContext(WotvDumpContext);
    const [books, setBooks] = useContext(UserBooksContext);

    const buildBookEntry = (book: Book, index: number) => {
        const bookType = book.value.replace(/.*\(|\).*/g, '');

        return (
            <IngredientEntry
                key={`bookinput-${index}`}
                title={bookType}
                current={books[book.key].current}
                totalNeeded={books[book.key].totalNeeded}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const newBooks: BookMap = {...books};

                    if (event.target.value === '') {
                        newBooks[book.key].current = null;
                    } else {
                        newBooks[book.key].current = +event.target.value;
                    }

                    setBooks(newBooks);
                }}
            />
        );
    };

    return (
        <div className="BooksList">
            {itemBooks.map(buildBookEntry)}
        </div>
    );
};