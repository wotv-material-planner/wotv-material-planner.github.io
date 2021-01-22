import * as React from 'react';
import {FunctionComponent, useContext, useState} from 'react';
import {CraftingItem, getTotalCraftingIngredients, UserCraftingItemsContext} from '~/contexts/UserCraftingItemsContext';
import {WotvDumpContext} from '~/contexts/WotvDumpContext';
import {RowMovementControls} from './RowMovementContrls';
import {RowTypeSelect} from './RowTypeSelect';
import {RowRecipe} from './RowRecipe';
import {RowBook} from './RowBook';
import {RowMaterials} from './RowMaterials';
import {RowDelete} from './RowDelete';
import './CraftingItemsTable.scss';

const move = (rawArr: CraftingItem[], movingIndex: number, targetIndex: number): CraftingItem[] => {
    const arr = rawArr.slice();

    const movingElement = arr.splice(movingIndex, 1)[0];
    arr.splice(targetIndex, 0, movingElement);

    return arr;
};

export const CraftingItemsTable: FunctionComponent = () => {
    const [craftingItems, setCraftingItems] = useContext(UserCraftingItemsContext);
    const [moveItem, setMoveItem] = useState<number>(null);

    const wotvDump = useContext(WotvDumpContext);
    const {artifactMap, typeMap} = wotvDump;

    const buildCraftingItemRow = (craftingItem: CraftingItem, itemIndex) => {
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
                    move={(moveItem !== null) && (moveItem !== itemIndex)}
                    isMoving={moveItem === itemIndex}
                    onMoveUp={() => {
                        if ((moveItem !== null)) {
                            setMoveItem(null);
                        }

                        if (itemIndex !== 0) {
                            setCraftingItems(move(craftingItems, itemIndex, itemIndex - 1));
                        }
                    }}
                    onMoveDown={() => {
                        if (moveItem !== null) {
                            setMoveItem(null);
                        }

                        if (itemIndex !== craftingItems.length - 1) {
                            setCraftingItems(move(craftingItems, itemIndex, itemIndex + 1));
                        }
                    }}
                    onMove={() => {
                        if (moveItem !== null) {
                            if (moveItem !== itemIndex) {
                                setCraftingItems(move(craftingItems, moveItem, itemIndex));
                            }

                            setMoveItem(null);
                        } else {
                            setMoveItem(itemIndex);
                        }
                    }}
                />
                <div className="CraftingItemsTable-row-main">
                    <div className="CraftingItemsTable-row-head">
                        <div className="CraftingItemsTable-row-head-itemName">
                            {`${artifact.name}${currentPlusText}`}
                        </div>
                        <RowTypeSelect
                            itemIndex={itemIndex}
                            typeOptions={typeMap[artifact.rtype]}
                        />
                        <div className="CraftingItemsTable-row-head-plusSelects">
                            {artifactMap[`${craftingItem.iname}_1`] &&
                                <div className="CraftingItemsTable-row-head-plusSelect">
                                    <div className="CraftingItemsTable-row-head-plusLabel">
                                        Current
                                    </div>
                                    <select
                                        className="CraftingItemsTable-row-head-select"
                                        value={craftingItem.currentPlus ?? ''}
                                        onChange={(event) => {
                                            const newCraftingItems = [...craftingItems];

                                            if (event.target.value === '') {
                                                newCraftingItems[itemIndex].currentPlus = null;
                                            } else {
                                                newCraftingItems[itemIndex].currentPlus = +event.target.value;
                                            }

                                            if (newCraftingItems[itemIndex].targetPlus < +event.target.value) {
                                                newCraftingItems[itemIndex].targetPlus = +event.target.value
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
                                </div>
                            }
                            {artifactMap[`${artifact.iname}_1`] &&
                                <div className="CraftingItemsTable-row-head-plusSelect">
                                    <div className="CraftingItemsTable-row-head-plusLabel">
                                        Target
                                    </div>
                                    <select
                                        className="CraftingItemsTable-row-head-select"
                                        value={craftingItem.targetPlus ?? ''}
                                        onChange={(event) => {
                                            const newCraftingItems = [...craftingItems];
                                            newCraftingItems[itemIndex].targetPlus = +event.target.value;

                                            if (newCraftingItems[itemIndex].currentPlus > +event.target.value) {
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
                                </div>
                            }
                        </div>
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
    };

    return (
        <div className="CraftingItemsTable">
            <div className="CraftingItemsTable-contents">
                {craftingItems.map(buildCraftingItemRow)}
            </div>
        </div>
    );
};