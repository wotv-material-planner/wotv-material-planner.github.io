import * as React from 'react';
import {FunctionComponent, useContext} from 'react';
import {WotvDumpContext} from '../contexts/WotvDumpContext';
import {BooksList} from './BooksList';
import './App.scss'
import {MaterialsList} from './MaterialsList';
import {CraftingPlan} from './CraftingPlan';
import {IngredientList} from './IngredientList';

export const App: FunctionComponent = () => {
    const dumpContext = useContext(WotvDumpContext);

    // console.log(dumpContext);

    return (
        <div className="App">
            <h1 className="App-title">WOTV MATERIAL PLANNER</h1>
            <div className="App-contents">
                <IngredientList
                    title="Books"
                >
                    <BooksList />
                </IngredientList>
                <MaterialsList />
                <CraftingPlan />
            </div>
        </div>
    );
};