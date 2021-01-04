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
            {
                itemBooks.map((book: Book, index: number) => {
                    const bookType = book.value.replace(/.*\(|\).*/g, '');

                    return (
                        <input 
                            placeholder={bookType}
                            name={book.key}
                            key={`bookinput-${index}`}
                            defaultValue={books[book.key].current}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                const newBooks: BookMap = {...books};
                                newBooks[book.key].current = +event.target.value;

                                setBooks(newBooks);
                            }}
                        />
                    );
                })
            }
        </div>
    );
};