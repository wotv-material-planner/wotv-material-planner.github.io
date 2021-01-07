import * as React from 'react';
import {FunctionComponent, useContext, ChangeEvent} from 'react';
import {Book, BookMap, UserBooksContext} from '../contexts/UserBooksContext';
import {WotvDumpContext} from '../contexts/WotvDumpContext';
import './BooksList.scss'

export const BooksList: FunctionComponent = () => {
    const {itemBooks} = useContext(WotvDumpContext);
    const [books, setBooks] = useContext(UserBooksContext);

    return (
        <div className="BooksList">
            <div>Books</div>
            {
                itemBooks.map((book: Book, index: number) => {
                    const bookType = book.value.replace(/.*\(|\).*/g, '');

                    return (
                        <div
                            key={`bookinput-${index}`}
                        >
                            <div>{bookType}</div>
                            <input
                                placeholder={`${bookType} books`}
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
                            <div>
                                / {books[book.key].totalNeeded ?? 0}
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};