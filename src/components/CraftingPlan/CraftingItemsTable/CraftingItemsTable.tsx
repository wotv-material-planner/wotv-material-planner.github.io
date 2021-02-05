import * as React from 'react';
import {FunctionComponent, useContext, useState} from 'react';
import {CraftingItem, getTotalCraftingIngredients, UserCraftingItemsContext} from '~/contexts/UserCraftingItemsContext';
import {WotvDumpContext} from '~/contexts/WotvDumpContext';
import {RowMovementControls} from './RowMovementControls';
import {RowTypeSelect} from './RowTypeSelect';
import {RowPlusSelects} from './RowPlusSelects';
import {RowRecipe} from './RowRecipe';
import {RowBook} from './RowBook';
import {RowMaterials} from './RowMaterials';
import {RowDelete} from './RowDelete';
import './CraftingItemsTable.scss';

export const CraftingItemsTable: FunctionComponent = () => {
    const [craftingItems, setCraftingItems] = useContext(UserCraftingItemsContext);
    const [moveItemIndex, setMoveItemIndex] = useState<number>(null);
    const wotvDump = useContext(WotvDumpContext);
    const {artifactMap, typeMap} = wotvDump;

    return (
        <div className="CraftingItemsTable">
            {craftingItems.map((craftingItem: CraftingItem, itemIndex: number) => {
                const artifact = artifactMap[craftingItem.iname];

                var currentPlusText = '';
                if (craftingItem.currentPlus) {
                    currentPlusText = ` (+${craftingItem.currentPlus})`;
                }

                const totalIngredients = getTotalCraftingIngredients([craftingItem], wotvDump);

                return (
                    <div
                        className="CraftingItemsTable-row"
                        key={`craftingItem-${itemIndex}`}
                    >
                        <RowMovementControls
                            itemIndex={itemIndex}
                            moveItemIndex={moveItemIndex}
                            setMoveItemIndex={(index) => {
                                setMoveItemIndex(index);
                            }}
                        />
                        <div>
                            <div className="CraftingItemsTable-row-head">
                                <div className="CraftingItemsTable-row-head-itemName">
                                    {`${artifact.name}${currentPlusText}`}
                                </div>
                                <RowTypeSelect
                                    itemIndex={itemIndex}
                                    typeOptions={typeMap[artifact.rtype]}
                                />
                                <RowPlusSelects
                                    itemIndex={itemIndex}
                                    displaySelect={!!artifactMap[`${craftingItem.iname}_1`]}
                                />
                            </div>
                            <div className="CraftingItemsTable-row-contents">
                                <div className="CraftingItemsTable-row-contents-inputs">
                                    <RowRecipe
                                        totalRecipes={totalIngredients.recipes}
                                        asset={`equipment/${artifact.asset}.png`}
                                    />
                                    <RowBook
                                        totalBooks={totalIngredients.books}
                                    />
                                    <RowMaterials
                                        totalMaterials={totalIngredients.materials}
                                    />
                                </div>
                            </div>
                        </div>
                        <RowDelete
                            itemIndex={itemIndex}
                            totalIngredients={totalIngredients}
                        />
                    </div>
                );
            })}
        </div>
    );
};