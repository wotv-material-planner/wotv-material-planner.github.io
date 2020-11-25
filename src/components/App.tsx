import * as React from 'react';
import {FunctionComponent, useContext} from 'react';
import {WotvDumpContext} from '../contexts/WotvDumpContext';
import {BooksList} from './BooksList';
import './App.scss'
import {MaterialsList} from './MaterialsList';

export const App: FunctionComponent = () => {
    const dumpContext = useContext(WotvDumpContext);

    // console.log(dumpContext);

    return (
        <div className="App">
            <h1>FFBE WOTV MATERIAL PLANNER</h1>
            <BooksList />
            <MaterialsList />
        </div>
    );
};