import * as React from 'react';
import {FunctionComponent, useContext, ChangeEvent} from 'react';
import {BookMap, UserBooksContext} from '../contexts/UserBooksContext';
import {CraftingItem, getTotalCraftingElements, UserCraftingItemsContext} from '../contexts/UserCraftingItemsContext';
import {RecipeMap, UserRecipesContext} from '../contexts/UserRecipesContext';
import {WotvDumpContext} from '../contexts/WotvDumpContext';
import './CraftingItemsTable.scss';

export const CraftingItemsTable: FunctionComponent = () => {
    const [craftingItems, setCraftingItems] = useContext(UserCraftingItemsContext);
    const [recipes, setRecipes] = useContext(UserRecipesContext);
    const [books, setBooks] = useContext(UserBooksContext);
    const wotvDump = useContext(WotvDumpContext);
    const {artifactMap, itemNameMap, typeMap} = wotvDump;

    const buildCraftingItemRow = (craftingItem: CraftingItem, itemIndex) => {
        const artifact = artifactMap[craftingItem.iname];

        let totalElements = getTotalCraftingElements([craftingItem], wotvDump);

        const recipe = Object.keys(totalElements.recipes)[0];

        const book = Object.keys(totalElements.books)[0];
        const bookType = itemNameMap[book]?.replace(/.*\(|\).*/g, '');

        const craftingMaterials = Object.keys(totalElements.materials);
        const material1 = craftingMaterials[0];
        const material2 = craftingMaterials[1];
        const material3 = craftingMaterials[2];
        const material4 = craftingMaterials[3];

        return (
            <div
                key={`craftingItem-${itemIndex}`}
            >
                <div>{artifact.name}</div>
                <div>
                    {typeMap[artifact.rtype][0].label &&
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
                    }
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
                    }
                </div>
                <div>
                    {artifactMap[`${artifact.iname}_1`] &&
                        <select
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
                    }
                </div>
                <div>
                    {recipe &&
                        <>
                            <input
                                placeholder={`${artifact.name} recipes`}
                                defaultValue={recipes[recipe].current}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    const newRecipes: RecipeMap = {...recipes};

                                    if (event.target.value === '') {
                                        newRecipes[recipe].current = null;
                                    } else {
                                        newRecipes[recipe].current = +event.target.value;
                                    }

                                    setRecipes(newRecipes);
                                }}
                            />
                            <div>
                                / {totalElements.recipes[recipe] ?? 0}
                            </div>
                        </>
                    }
                </div>
                <div>
                    {book &&
                        <>
                            <input
                                placeholder={`${bookType} books`}
                                defaultValue={books[book].current}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    const newBooks: BookMap = {...books};

                                    if (event.target.value === '') {
                                        newBooks[book].current = null;
                                    } else {
                                        newBooks[book].current = +event.target.value;
                                    }

                                    setBooks(newBooks);
                                }}
                            />
                            <div>
                                / {totalElements.books[book] ?? 0}
                            </div>
                        </>
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