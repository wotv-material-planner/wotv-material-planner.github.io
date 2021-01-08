import * as React from 'react';
import {FunctionComponent, useContext, ChangeEvent} from 'react';
import {Book, BookMap, UserBooksContext} from '../contexts/UserBooksContext';
import {WotvDumpContext} from '../contexts/WotvDumpContext';
import './BooksList.scss'

export const BooksList: FunctionComponent = () => {
    const {itemBooks} = useContext(WotvDumpContext);
    const [books, setBooks] = useContext(UserBooksContext);

    const buildBookEntry = (book: Book, index: number) => {
        const bookType = book.value.replace(/.*\(|\).*/g, '');

        return (
            <div
                className="BooksList-book"
                key={`bookinput-${index}`}
            >
                <div className="BooksList-bookTitle">
                    {bookType}
                </div>
                <div className="BooksList-bookValues">
                    <input
                        className="BooksList-bookValues-current"
                        placeholder={bookType}
                        name={book.key}
                        defaultValue={books[book.key].current}
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
                    <div className="BooksList-bookValues-separator">/</div>
                    <div className="BooksList-bookValues-totalNeeded">
                        {books[book.key].totalNeeded ?? 0}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="BooksList">
            <div className="BooksList-title">Books</div>
            <div className="BooksList-books">
                {itemBooks.map(buildBookEntry)}
            </div>
        </div>
    );
};