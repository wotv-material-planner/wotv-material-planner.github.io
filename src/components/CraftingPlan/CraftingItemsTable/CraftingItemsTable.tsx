import * as React from 'react';
import {FunctionComponent, useContext, useState, ChangeEvent} from 'react';
import {UserBookMap, UserBooksContext} from '~/contexts/UserBooksContext';
import {CraftingItem, getTotalCraftingIngredients, UserCraftingItemsContext} from '~/contexts/UserCraftingItemsContext';
import {UserMaterialMap, UserMaterialsContext} from '~/contexts/UserMaterialsContext';
import {UserRecipeMap, UserRecipesContext} from '~/contexts/UserRecipesContext';
import {WotvDumpContext} from '~/contexts/WotvDumpContext';
import {IngredientEntry} from '~/components/common/IngredientEntry';
import {RowMovementControls} from './RowMovementContrls';
import {RowRecipe} from './RowRecipe';
import './CraftingItemsTable.scss';
import {RowDelete} from './RowDelete';

const move = (rawArr: CraftingItem[], movingIndex: number, targetIndex: number): CraftingItem[] => {
    const arr = rawArr.slice();

    const movingElement = arr.splice(movingIndex, 1)[0];
    arr.splice(targetIndex, 0, movingElement);

    return arr;
};

export const CraftingItemsTable: FunctionComponent = () => {
    const [craftingItems, setCraftingItems] = useContext(UserCraftingItemsContext);
    const [books, setBooks] = useContext(UserBooksContext);
    const [materials, setMaterials] = useContext(UserMaterialsContext);
    const [moveItem, setMoveItem] = useState<number>(null);

    const wotvDump = useContext(WotvDumpContext);
    const {artifactMap, itemNameMap, typeMap} = wotvDump;

    const buildCraftingItemRow = (craftingItem: CraftingItem, itemIndex) => {
        const artifact = artifactMap[craftingItem.iname];

        var currentPlusText = '';
        if (craftingItem.currentPlus) {
            currentPlusText = ` (+${craftingItem.currentPlus})`;
        }

        const totalIngredients = getTotalCraftingIngredients([craftingItem], wotvDump);

        const book = Object.keys(totalIngredients.books)[0];
        const bookType = itemNameMap[book]?.replace(/.*\(|\).*/g, '');

        const craftingMaterials = Object.keys(totalIngredients.materials);
        const material1 = craftingMaterials[0];
        const material2 = craftingMaterials[1];
        const material3 = craftingMaterials[2];
        const material4 = craftingMaterials[3];

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
                        <div className="CraftingItemsTable-row-head-itemType">
                            {typeMap[artifact.rtype][0].label &&
                                <select
                                    className="CraftingItemsTable-row-head-itemType-select"
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
                            }
                        </div>
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
                        <RowDelete
                            itemIndex={itemIndex}
                            totalIngredients={totalIngredients}
                        />
                    </div>
                    <div className="CraftingItemsTable-row-contents">
                        <div className="CraftingItemsTable-row-contents-inputs">
                            <RowRecipe
                                totalRecipes={totalIngredients.recipes}
                                asset={`equipment/${artifact.asset}.png`}
                            />
                            <div>
                                {book &&
                                    <IngredientEntry
                                        title={`${bookType} books`}
                                        current={books[book].current}
                                        totalNeeded={totalIngredients.books[book]}
                                        asset={`items/${book}.png`}
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                            const newBooks: UserBookMap = {...books};

                                            if (event.target.value === '') {
                                                newBooks[book].current = null;
                                            } else {
                                                newBooks[book].current = +event.target.value;
                                            }

                                            setBooks(newBooks);
                                        }}
                                    />
                                }
                            </div>
                            <div>
                                {material1 &&
                                    <IngredientEntry
                                        title={itemNameMap[material1]}
                                        current={materials[material1].current}
                                        totalNeeded={totalIngredients.materials[material1]}
                                        asset={`items/${material1}.png`}
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                            const newMaterials: UserMaterialMap = {...materials};

                                            if (event.target.value === '') {
                                                newMaterials[material1].current = null;
                                            } else {
                                                newMaterials[material1].current = +event.target.value;
                                            }

                                            setMaterials(newMaterials);
                                        }}
                                    />
                                }
                            </div>
                            <div>
                                {material2 &&
                                    <IngredientEntry
                                        title={itemNameMap[material2]}
                                        current={materials[material2].current}
                                        totalNeeded={totalIngredients.materials[material2]}
                                        asset={`items/${material2}.png`}
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                            const newMaterials: UserMaterialMap = {...materials};

                                            if (event.target.value === '') {
                                                newMaterials[material2].current = null;
                                            } else {
                                                newMaterials[material2].current = +event.target.value;
                                            }

                                            setMaterials(newMaterials);
                                        }}
                                    />
                                }
                            </div>
                            <div>
                                {material3 &&
                                    <IngredientEntry
                                        title={itemNameMap[material3]}
                                        current={materials[material3].current}
                                        totalNeeded={totalIngredients.materials[material3]}
                                        asset={`items/${material3}.png`}
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                            const newMaterials: UserMaterialMap = {...materials};

                                            if (event.target.value === '') {
                                                newMaterials[material3].current = null;
                                            } else {
                                                newMaterials[material3].current = +event.target.value;
                                            }

                                            setMaterials(newMaterials);
                                        }}
                                    />
                                }
                            </div>
                            <div>
                                {material4 &&
                                    <IngredientEntry
                                        title={itemNameMap[material4]}
                                        current={materials[material4].current}
                                        totalNeeded={totalIngredients.materials[material4]}
                                        asset={`items/${material4}.png`}
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                            const newMaterials: UserMaterialMap = {...materials};

                                            if (event.target.value === '') {
                                                newMaterials[material4].current = null;
                                            } else {
                                                newMaterials[material4].current = +event.target.value;
                                            }

                                            setMaterials(newMaterials);
                                        }}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
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