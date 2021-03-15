import * as React from 'react';
import {FunctionComponent, useContext, ChangeEvent} from 'react';
import {UserBooksContext} from '~/contexts/UserBooksContext';
import {WotvDumpContext} from '~/contexts/WotvDumpContext';
import {IngredientEntry} from '~/components/common/IngredientEntry';
import './BooksList.scss'
import {UserIngredientMap} from '~contexts/UserDataProvider';

export const BooksList: FunctionComponent = () => {
    const {itemBookMap} = useContext(WotvDumpContext);
    const itemBooks = Object.keys(itemBookMap);
    const [books, setBooks] = useContext(UserBooksContext);

    const buildBookEntry = (book: string, index: number) => {
        const bookType = itemBookMap[book].name.replace(/.*\(|\).*/g, '');

        return (
            <IngredientEntry
                key={`bookinput-${index}`}
                title={bookType}
                ingredient={book}
                ingredientTotals={books[book]}
                asset={`items/${book}.png`}
                totalNeeded={books[book].totalNeeded}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const newBooks: UserIngredientMap = {...books};

                    if (event.target.value === '') {
                        newBooks[book].current = null;
                    } else {
                        newBooks[book].current = +event.target.value;
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