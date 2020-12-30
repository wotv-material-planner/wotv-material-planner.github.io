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
                <div>
                    <select
                        value={craftingItem.targetGrowthType}
                        onChange={(event) => {
                            const newCraftingItems = [...craftingItems];
                            craftingItems[itemIndex].targetGrowthType = event.target.value;

                            setCraftingItems(newCraftingItems);
                        }}
                    >
                        <option value="" />
                        {typeMap[artifact.rtype].map((typeOptions, index) => {
                            return (
                                <option
                                    key={`craftingItem-${itemIndex}-option-${index}`}
                                    value={typeOptions.value}
                                >
                                    {typeOptions.label}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    {artifactMap[`${craftingItem.iname}_1`] &&
                        <select
                            value={craftingItem.currentPlus ?? ''}
                            onChange={(event) => {
                                const newCraftingItems = [...craftingItems];

                                if (event.target.value === '') {
                                    newCraftingItems[itemIndex].currentPlus = null;
                                } else {
                                    newCraftingItems[itemIndex].currentPlus = +event.target.value;
                                }

                                setCraftingItems(newCraftingItems);
                            }}
                        >
                            <option value=""></option>
                            <option value="0">+0</option>
                            <option value="1">+1</option>
                            <option value="2">+2</option>
                            <option value="3">+3</option>
                            <option value="4">+4</option>
                            <option value="5">+5</option>
                        </select>
                    }
                </div>
                <div>
                    {artifactMap[`${artifact.iname}_1`] &&
                        <select
                            value={craftingItem.targetPlus}
                            onChange={(event) => {
                                const newCraftingItems = [...craftingItems];
                                newCraftingItems[itemIndex].targetPlus = +event.target.value;

                                setCraftingItems(newCraftingItems);
                            }}
                        >
                            <option value="0">+0</option>
                            <option value="1">+1</option>
                            <option value="2">+2</option>
                            <option value="3">+3</option>
                            <option value="4">+4</option>
                            <option value="5">+5</option>
                        </select>
                    }
                </div>
            </div>
        );
    };

    return (
        <div className="CraftingItemsTable">
            <div>Crafting Items</div>
            {craftingItems.map(buildCraftingItemRow)}
        </div>
    );
};