import * as React from 'react';
import {FunctionComponent, useContext} from 'react';
import {CraftingItem, UserCraftingItemsContext} from '../contexts/UserCraftingItemsContext';
import './CraftingItemsTable.scss';

export const CraftingItemsTable: FunctionComponent = () => {
    const [craftingItems, setCraftingItems] = useContext(UserCraftingItemsContext);

    return (
        <div className="CraftingItemsTable">
            <div>Crafting Items</div>
            {
                craftingItems.map((craftingItem: CraftingItem, index) => {
                    return (
                        <div
                            key={`craftingItem-${index}`}
                        >
                            {craftingItem.displayName}
                        </div>
                    );
                })
            }
        </div>
    );
};