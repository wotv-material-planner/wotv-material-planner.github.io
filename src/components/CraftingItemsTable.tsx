import * as React from 'react';
import {FunctionComponent, useContext} from 'react';
import {CraftingItem, UserCraftingItemsContext} from '../contexts/UserCraftingItemsContext';
import {WotvDumpContext} from '../contexts/WotvDumpContext';
import './CraftingItemsTable.scss';

export const CraftingItemsTable: FunctionComponent = () => {
    const [craftingItems, setCraftingItems] = useContext(UserCraftingItemsContext);
    const {artifactMap} = useContext(WotvDumpContext);

    return (
        <div className="CraftingItemsTable">
            <div>Crafting Items</div>
            {
                craftingItems.map((craftingItem: CraftingItem, index) => {
                    const artifact = artifactMap[craftingItem.iname];

                    return (
                        <div
                            key={`craftingItem-${index}`}
                        >
                            {artifact.name}
                        </div>
                    );
                })
            }
        </div>
    );
};