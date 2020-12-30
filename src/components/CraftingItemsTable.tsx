import * as React from 'react';
import {FunctionComponent, useContext} from 'react';
import {CraftingItem, UserCraftingItemsContext} from '../contexts/UserCraftingItemsContext';
import {WotvDumpContext} from '../contexts/WotvDumpContext';
import './CraftingItemsTable.scss';

export const CraftingItemsTable: FunctionComponent = () => {
    const [craftingItems, setCraftingItems] = useContext(UserCraftingItemsContext);
    const {artifactMap, typeMap} = useContext(WotvDumpContext);

    const buildCraftingItemRow = (craftingItem: CraftingItem, itemIndex) => {
        const artifact = artifactMap[craftingItem.iname];

        return (
            <div
                key={`craftingItem-${itemIndex}`}
            >
                <div>{artifact.name}</div>
                <select
                    value={craftingItem.targetGrowthType}
                    onChange={(e) => {
                        const newCraftingItems = [...craftingItems];
                        craftingItems[itemIndex].targetGrowthType = e.target.value;

                        setCraftingItems(newCraftingItems);
                    }}
                >
                    <option value="" />
                    {typeMap[artifact.rtype].map((typeOptions, index) => {
                        return (
                            <option
                                key={`craftingItem-${itemIndex}-option-${index}`}
                            >
                                {typeOptions.label}
                            </option>
                        )
                    })}
                </select>
            </div>
        );
    }

    return (
        <div className="CraftingItemsTable">
            <div>Crafting Items</div>
            {craftingItems.map(buildCraftingItemRow)}
        </div>
    );
};