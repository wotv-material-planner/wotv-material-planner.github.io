import * as React from 'react';
import {createContext, FunctionComponent, useContext, useEffect} from 'react';
import {usePersistedState, PersistedState} from '../hooks/UsePersistedState';
import {BookMap, UserBooksContext} from './UserBooksContext';
import {MaterialMap, UserMaterialsContext} from './UserMaterialsContext';
import {RecipeMap, UserRecipesContext} from './UserRecipesContext';
import {WotvDumpContext} from './WotvDumpContext';

export interface CraftingItem {
    iname: string;
    category: number;
    currentPlus: number | null;
    targetPlus: number;
    targetGrowthType: string
};

interface ElementValue {
    num: number;
};

interface ElementValueMap {
    [num: string]: ElementValue;
};

interface TotalElementsValue {
    [material: string]: number;
};

interface TotalElementsMap {
    books: TotalElementsValue;
    recipes: TotalElementsValue;
    materials: TotalElementsValue;
};

export const UserCraftingItemsContext = createContext<PersistedState<CraftingItem[]>>([null, null]);

interface ProviderProps {
    init?: CraftingItem[];
};

export const UserCraftingItemsProvider: FunctionComponent<ProviderProps> = (props) => {
    const defaultContext: PersistedState<CraftingItem[]> = 
        usePersistedState<CraftingItem[]>('userCraftingItems', props.init || []);

    const [craftingItems, setCraftingItems] = defaultContext;
    const [books, setBooks] = useContext(UserBooksContext);
    const [recipes, setRecipes] = useContext(UserRecipesContext);
    const [materials, setMaterials] = useContext(UserMaterialsContext);
    const {artifactRecipeMap, artifactAwakeMap} = useContext(WotvDumpContext);

    const getItemElements = (iname: string, level: number): ElementValueMap => {
        const elements: ElementValueMap = {};

        if (artifactRecipeMap[iname]) {
            artifactRecipeMap[iname].craft.forEach((craftingElement) => {
                switch (craftingElement.type) {
                    case 0:
                        if (elements[craftingElement.id]) {
                            elements[craftingElement.id].num += +craftingElement.num;
                        } else {
                            elements[craftingElement.id] = craftingElement;
                        }

                        break;
                    case 1:
                        let itemElements = getItemElements(craftingElement.id, craftingElement.lv);

                        for (let iname in itemElements) {
                            if (elements[iname]) {
                                elements[iname].num += itemElements[iname].num;
                            } else {
                                elements[iname] = itemElements[iname];
                            }
                        }

                        break;
                }
            });
        }

        if (artifactAwakeMap[iname]) {
            artifactAwakeMap[iname].awakes.forEach((awake) => {
                if (awake.lv <= level) {
                    let matIndex = 1;

                    while (awake['mat' + matIndex] && matIndex <= 9) {
                        let mat = awake['mat' + matIndex].split(',');

                        if (elements[mat[0]]) {
                            elements[mat[0]].num += +mat[1];
                        } else {
                            elements[mat[0]] = {
                                num: +mat[1]
                            };
                        }

                        matIndex++;
                    }
                }
            });
        }

        return elements;
    };

    const getTotalElements = (items: CraftingItem[]): TotalElementsMap => {
        return craftingItems.reduce((acc: TotalElementsMap, curr: CraftingItem) => {
            let targetPlusIname = curr.iname;

            if (curr.targetPlus) {
                targetPlusIname = `${curr.iname}_${curr.targetPlus}`;
            }

            const targetElements: ElementValueMap = getItemElements(targetPlusIname, curr.targetPlus * 10);

            let currentElements: ElementValueMap = {};

            if (curr.currentPlus !== null) {
                let currentPlusIname = curr.iname;

                if (curr.currentPlus) {
                    currentPlusIname = `${curr.iname}_${curr.currentPlus}`;
                }

                currentElements = getItemElements(currentPlusIname, curr.currentPlus * 10);
            }

            for (let iname in targetElements) {
                const needed = targetElements[iname].num - (currentElements[iname]?.num || 0);

                if (iname.startsWith('IT_AF_AW')) {
                    if (!acc.books[iname]) {
                        acc.books[iname] = needed;
                    } else {
                        acc.books[iname] += needed;
                    }
                }

                if (iname.startsWith('IT_AF_LW')) {
                    if (!acc.recipes[iname]) {
                        acc.recipes[iname] = needed;
                    } else {
                        acc.recipes[iname] += needed;
                    }
                }

                if (iname.startsWith('IT_AF_MAT')) {
                    if (!acc.materials[iname]) {
                        acc.materials[iname] = needed;
                    } else {
                        acc.materials[iname] = needed;
                    }
                }
            }

            return acc;
        }, {books: {}, recipes: {}, materials: {}} as TotalElementsMap);
    };

    useEffect(() => {
        const newBooks: BookMap = {...books};
        const newRecipes: RecipeMap = {...recipes};
        const newMaterials: MaterialMap = {...materials};

        const totalElements: TotalElementsMap = getTotalElements(craftingItems);

        for (let book in totalElements.books) {
            newBooks[book].totalNeeded = totalElements.books[book];
        }

        setBooks(newBooks);

        for (let recipe in totalElements.recipes) {
            newRecipes[recipe].totalNeeded = totalElements.recipes[recipe];
        }

        setRecipes(newRecipes);

        for (let material in totalElements.materials) {
            newMaterials[material].totalNeeded = totalElements.materials[material];
        }

        setMaterials(newMaterials);
    }, [craftingItems]);

    return (
        <UserCraftingItemsContext.Provider value={defaultContext}>
            {props.children}
        </UserCraftingItemsContext.Provider>
    );
};