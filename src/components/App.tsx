import * as React from 'react';
import {FunctionComponent, useContext} from 'react';
import {WotvDumpContext} from '../contexts/WotvDumpContext';
import {BooksList} from './BooksList';
import './App.scss'
import {MaterialsList} from './MaterialsList';
import {CraftingPlan} from './CraftingPlan';
import {IngredientList} from './IngredientList';
import {BooksListToggleContext} from '../contexts/BooksListToggleContext';

export const App: FunctionComponent = () => {
    const dumpContext = useContext(WotvDumpContext);
    const [booksListToggle, setsBookListToggle] = useContext(BooksListToggleContext);

    // console.log(dumpContext);

    return (
        <div className="App">
            <h1 className="App-title">WOTV MATERIAL PLANNER</h1>
            <div className="App-contents">
                <IngredientList
                    title="Books"
                    toggle={() => {
                        setsBookListToggle(!booksListToggle);
                    }}
                >
                    {booksListToggle &&
                        <BooksList />
                    }
                </IngredientList>
                <MaterialsList />
                <CraftingPlan />
            </div>
        </div>
    );
};