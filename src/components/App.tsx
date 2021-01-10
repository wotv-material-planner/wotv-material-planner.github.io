import * as React from 'react';
import {FunctionComponent, useContext} from 'react';
import {WotvDumpContext} from '../contexts/WotvDumpContext';
import {BooksList} from './BooksList';
import './App.scss'
import {MaterialsList} from './MaterialsList';
import {CraftingPlan} from './CraftingPlan';
import {IngredientList} from './IngredientList';
import {BooksListToggleContext} from '../contexts/BooksListToggleContext';
import {MaterialsListToggleContext} from '../contexts/MaterialsListToggleContext';

export const App: FunctionComponent = () => {
    const dumpContext = useContext(WotvDumpContext);
    const [booksListToggle, setBooksListToggle] = useContext(BooksListToggleContext);
    const [materialsListToggle, setMaterialsListToggle] = useContext(MaterialsListToggleContext);

    // console.log(dumpContext);

    return (
        <div className="App">
            <h1 className="App-title">WOTV MATERIAL PLANNER</h1>
            <div className="App-contents">
                <IngredientList
                    title="Books"
                    toggle={() => {
                        setBooksListToggle(!booksListToggle);
                    }}
                >
                    {booksListToggle &&
                        <BooksList />
                    }
                </IngredientList>
                <IngredientList
                    title="Materials"
                    toggle={() => {
                        setMaterialsListToggle(!materialsListToggle);
                    }}
                >
                    {materialsListToggle &&
                        <MaterialsList />
                    }
                </IngredientList>
                <CraftingPlan />
            </div>
        </div>
    );
};