import * as React from 'react';
import {FunctionComponent, useContext} from 'react';
import {BooksList} from './BooksList';
import {MaterialsList} from './MaterialsList';
import {CraftingPlan} from './CraftingPlan';
import {ContentsDrawer} from './ContentsDrawer';
import './App.scss'

export const App: FunctionComponent = () => {
    return (
        <div className="App">
            <h1 className="App-title">WOTV MATERIAL PLANNER</h1>
            <div className="App-contents">
                <ContentsDrawer
                    title="Books"
                >
                    <BooksList />
                </ContentsDrawer>
                <ContentsDrawer
                    title="Materials"
                >
                    <MaterialsList />
                </ContentsDrawer>
                <ContentsDrawer
                    title="Crafting Plan"
                    fixed={true}
                >
                    <CraftingPlan />
                </ContentsDrawer>
            </div>
        </div>
    );
};