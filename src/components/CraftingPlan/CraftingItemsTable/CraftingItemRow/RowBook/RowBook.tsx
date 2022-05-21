import * as React from 'react';
import {FunctionComponent, useContext, ChangeEvent} from 'react';
import {IngredientEntry} from '../../../../common/IngredientEntry';
import {UserBooksContext} from '../../../../../contexts/UserBooksContext';
import {CraftingIngredientMap} from '../../../../../contexts/UserCraftingItemsContext';
import {UserIngredientMap} from '../../../../../contexts/UserDataProvider';
import {WotvDumpContext} from '../../../../../contexts/WotvDumpContext';
import './RowBook.scss'

interface Props {
    totalBooks: CraftingIngredientMap;
};

export const RowBook: FunctionComponent<Props> = (props) => {
    const [books, setBooks] = useContext(UserBooksContext);
    const {itemNameMap} = useContext(WotvDumpContext);

    const book = Object.keys(props.totalBooks)[0];
    const bookType = itemNameMap[book]?.replace(/.*\(|\).*/g, '');

    return (
        <div className="RowBook">
            {book &&
                <IngredientEntry
                    ingredient={book}
                    ingredientTotals={books[book]}
                    title={`${bookType} books`}
                    totalNeeded={props.totalBooks[book]}
                    asset={`img/item/${book.toLowerCase()}.png`}
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
            }
        </div>
    );
};