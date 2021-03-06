import * as React from 'react';
import {FunctionComponent} from 'react';
import {BooksList} from '~/components/BooksList';
import {MaterialsList} from '~/components/MaterialsList';
import {CraftingPlan} from '~/components/CraftingPlan';
import {ContentsDrawer} from '~/components/common/ContentsDrawer';
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
                    title="Crafting"
                    fixed={true}
                >
                    <CraftingPlan />
                </ContentsDrawer>
            </div>
        </div>
    );
};