import * as React from 'react';
import {FunctionComponent, useContext, useState} from 'react';
import {AddCraftingItems} from './AddCraftingItems';
import {CraftingItemsTable} from './CraftingItemsTable';
import './CraftingPlan.scss'

export const CraftingPlan: FunctionComponent = () => {
    return (
        <div className="CraftingPlan">
            <AddCraftingItems/>
            <CraftingItemsTable/>
        </div>
    );
};