import * as React from 'react';
import {FunctionComponent, useContext} from 'react';
import {WotvDumpContext} from '../contexts/WotvDumpContext';
import {BooksList} from './BooksList';
import './App.scss'
import {MaterialsList} from './MaterialsList';
import {CraftingPlan} from './CraftingPlan';

export const App: FunctionComponent = () => {
    const dumpContext = useContext(WotvDumpContext);

    // console.log(dumpContext);

    return (
        <div className="App">
            <h1 className="App-title">WOTV MATERIAL PLANNER</h1>
            <div className="App-contents">
                <BooksList />
                <MaterialsList />
                <CraftingPlan />
            </div>
        </div>
    );
};