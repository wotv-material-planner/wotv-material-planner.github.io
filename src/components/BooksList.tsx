import * as React from 'react';
import {FunctionComponent, useContext, ChangeEvent} from 'react';
import {BookMap, UserBooksContext, wotvBooks} from '../contexts/UserBooksContext';

export const BooksList: FunctionComponent = () => {
    const [books, setBooks] = useContext(UserBooksContext);

    return (
        <div className="BooksList">
            {
                wotvBooks.map((book, index) => {
                    return (
                        <input 
                            placeholder={book}
                            name={book}
                            key={`bookinput-${index}`}
                            defaultValue={books[book]}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                const newBooks: BookMap = {...books};
                                newBooks[book] = +event.target.value;

                                setBooks(newBooks);
                            }}
                        />
                    );
                })
            }
        </div>
    );
};