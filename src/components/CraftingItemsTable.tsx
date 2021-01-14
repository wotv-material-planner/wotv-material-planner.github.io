import * as React from 'react';
import {FunctionComponent, useContext, ChangeEvent} from 'react';
import {BookMap, UserBooksContext} from '../contexts/UserBooksContext';
import {CraftingItem, getTotalCraftingIngredients, UserCraftingItemsContext} from '../contexts/UserCraftingItemsContext';
import {MaterialMap, UserMaterialsContext} from '../contexts/UserMaterialsContext';
import {RecipeMap, UserRecipesContext} from '../contexts/UserRecipesContext';
import {WotvDumpContext} from '../contexts/WotvDumpContext';
import './CraftingItemsTable.scss';

export const CraftingItemsTable: FunctionComponent = () => {
    const [craftingItems, setCraftingItems] = useContext(UserCraftingItemsContext);
    const [recipes, setRecipes] = useContext(UserRecipesContext);
    const [books, setBooks] = useContext(UserBooksContext);
    const [materials, setMaterials] = useContext(UserMaterialsContext);
    const wotvDump = useContext(WotvDumpContext);
    const {artifactMap, itemNameMap, typeMap} = wotvDump;

    const buildCraftingItemRow = (craftingItem: CraftingItem, itemIndex) => {
        const artifact = artifactMap[craftingItem.iname];

        const totalIngredients = getTotalCraftingIngredients([craftingItem], wotvDump);

        const recipe = Object.keys(totalIngredients.recipes)[0];

        const book = Object.keys(totalIngredients.books)[0];
        const bookType = itemNameMap[book]?.replace(/.*\(|\).*/g, '');

        const craftingMaterials = Object.keys(totalIngredients.materials);
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
                                name={recipe}
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
                                / {totalIngredients.recipes[recipe] ?? 0}
                            </div>
                        </>
                    }
                </div>
                <div>
                    {book &&
                        <>
                            <input
                                placeholder={`${bookType} books`}
                                name={book}
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
                                / {totalIngredients.books[book] ?? 0}
                            </div>
                        </>
                    }
                </div>
                <div>
                    {material1 &&
                        <>
                            <input
                                placeholder={itemNameMap[material1]}
                                name={material1}
                                defaultValue={materials[material1].current}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    const newMaterials: MaterialMap = {...materials};

                                    if (event.target.value === '') {
                                        newMaterials[material1].current = null;
                                    } else {
                                        newMaterials[material1].current = +event.target.value;
                                    }

                                    setMaterials(newMaterials);
                                }}
                            />
                            <div>
                                / {totalIngredients.materials[material1] ?? 0}
                            </div>
                        </>
                    }
                </div>
                <div>
                    {material2 &&
                        <>
                            <input
                                placeholder={itemNameMap[material2]}
                                name={material2}
                                defaultValue={materials[material2].current}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    const newMaterials: MaterialMap = {...materials};

                                    if (event.target.value === '') {
                                        newMaterials[material2].current = null;
                                    } else {
                                        newMaterials[material2].current = +event.target.value;
                                    }

                                    setMaterials(newMaterials);
                                }}
                            />
                            <div>
                                / {totalIngredients.materials[material2] ?? 0}
                            </div>
                        </>
                    }
                </div>
                <div>
                    {material3 &&
                        <>
                            <input
                                placeholder={itemNameMap[material3]}
                                name={material3}
                                defaultValue={materials[material3].current}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    const newMaterials: MaterialMap = {...materials};

                                    if (event.target.value === '') {
                                        newMaterials[material3].current = null;
                                    } else {
                                        newMaterials[material3].current = +event.target.value;
                                    }

                                    setMaterials(newMaterials);
                                }}
                            />
                            <div>
                                / {totalIngredients.materials[material3] ?? 0}
                            </div>
                        </>
                    }
                </div>
                <div>
                    {material4 &&
                        <>
                            <input
                                placeholder={itemNameMap[material4]}
                                name={material4}
                                defaultValue={materials[material4].current}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    const newMaterials: MaterialMap = {...materials};

                                    if (event.target.value === '') {
                                        newMaterials[material4].current = null;
                                    } else {
                                        newMaterials[material4].current = +event.target.value;
                                    }

                                    setMaterials(newMaterials);
                                }}
                            />
                            <div>
                                / {totalIngredients.materials[material4] ?? 0}
                            </div>
                        </>
                    }
                </div>
                <div
                    onClick={() => {
                        const newCraftingItems: CraftingItem[] = [...craftingItems];
                        newCraftingItems.splice(itemIndex, 1);

                        const newBooks = {...books};
                        const newRecipes = {...recipes};
                        const newMaterials = {...materials};

                        if (book) {
                            newBooks[book].totalNeeded -= totalIngredients.books[book];
                        }

                        setBooks(newBooks);

                        if (recipe) {
                            newRecipes[recipe].totalNeeded -= totalIngredients.recipes[recipe];
                        }

                        setRecipes(newRecipes);

                        if (material1) {
                            newMaterials[material1].totalNeeded -= totalIngredients.materials[material1];
                        }

                        if (material2) {
                            newMaterials[material2].totalNeeded -= totalIngredients.materials[material2];
                        }

                        if (material3) {
                            newMaterials[material3].totalNeeded -= totalIngredients.materials[material3];
                        }

                        if (material4) {
                            newMaterials[material4].totalNeeded -= totalIngredients.materials[material4];
                        }

                        setMaterials(newMaterials);

                        setCraftingItems(newCraftingItems);
                    }}
                >
                    <i className="material-icons">delete_forever</i>
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