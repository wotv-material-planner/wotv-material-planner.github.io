import * as React from 'react';
import {createContext, FunctionComponent, useContext, useEffect} from 'react';
import {usePersistedState, PersistedState} from '../hooks/UsePersistedState';
import {UserBookMap, UserBooksContext} from './UserBooksContext';
import {UserMaterialMap, UserMaterialsContext} from './UserMaterialsContext';
import {UserRecipeMap, UserRecipesContext} from './UserRecipesContext';
import {DumpContext, WotvDumpContext} from './WotvDumpContext';

export interface CraftingItem {
    iname: string;
    category: number;
    currentPlus: number | null;
    targetPlus: number;
    targetGrowthType: string;
};

interface CraftingIngredientMap {
    [num: string]: number;
};

export interface TotalCraftingIngredients {
    books: CraftingIngredientMap;
    recipes: CraftingIngredientMap;
    materials: CraftingIngredientMap;
};

interface ProviderProps {
    init?: CraftingItem[];
};

export const UserCraftingItemsContext = createContext<PersistedState<CraftingItem[]>>([null, null]);

export const getItemCraftingIngredients = (iname: string, level: number, wotvDump: DumpContext): CraftingIngredientMap => {
    const ingredients: CraftingIngredientMap = {};
    const {artifactRecipeMap, artifactAwakeMap} = wotvDump;

    if (artifactRecipeMap[iname]) {
        artifactRecipeMap[iname].craft.forEach((craftingIngredient) => {
            if (craftingIngredient.type === 0) {
                if (!ingredients[craftingIngredient.id]) {
                    ingredients[craftingIngredient.id] = +craftingIngredient.num;
                } else {
                    ingredients[craftingIngredient.id] += +craftingIngredient.num;
                }

            } else {
                let itemIngredients = getItemCraftingIngredients(craftingIngredient.id, craftingIngredient.lv, wotvDump);

                for (let iname in itemIngredients) {
                    if (!ingredients[iname]) {
                        ingredients[iname] = itemIngredients[iname];
                    } else {
                        ingredients[iname] += itemIngredients[iname];
                    }
                }
            }
        });
    }

    if (artifactAwakeMap[iname]) {
        artifactAwakeMap[iname].awakes.forEach((awake) => {
            if (awake.lv <= level) {
                let matIndex = 1;

                while (awake['mat' + matIndex] && matIndex <= 9) {
                    let mat = awake['mat' + matIndex].split(',');

                    if (ingredients[mat[0]]) {
                        ingredients[mat[0]] += +mat[1];
                    } else {
                        ingredients[mat[0]] = +mat[1];
                    }

                    matIndex++;
                }
            }
        });
    }

    return ingredients;
};

export const getTotalCraftingIngredients = (items: CraftingItem[], wotvDump: DumpContext): TotalCraftingIngredients => {
    const {itemRecipeMap} = wotvDump;
    const allRecipes = Object.keys(itemRecipeMap);

    return items.reduce((acc: TotalCraftingIngredients, curr: CraftingItem) => {
        let targetPlusIname = curr.iname;

        if (curr.targetPlus) {
            targetPlusIname = `${curr.iname}_${curr.targetPlus}`;
        }

        const targetLevel = (curr.targetPlus ?? 5) * 10;

        const targetPlusIngredients = getItemCraftingIngredients(targetPlusIname, targetLevel, wotvDump);

        let currentPlusIngredients: CraftingIngredientMap = {};

        if (curr.currentPlus !== null) {
            let currentPlusIname = curr.iname;

            if (curr.currentPlus) {
                currentPlusIname = `${curr.iname}_${curr.currentPlus}`;
            }

            currentPlusIngredients = getItemCraftingIngredients(currentPlusIname, curr.currentPlus * 10, wotvDump);
        }

        for (let iname in targetPlusIngredients) {
            const needed = targetPlusIngredients[iname] - (currentPlusIngredients[iname] || 0);

            if (iname.startsWith('IT_AF_AW')) {
                if (!acc.books[iname]) {
                    acc.books[iname] = needed;
                } else {
                    acc.books[iname] += needed;
                }
            }

            if (allRecipes.includes(iname)) {
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
                    acc.materials[iname] += needed;
                }
            }
        }

        return acc;
    }, {books: {}, recipes: {}, materials: {}} as TotalCraftingIngredients);
};

export const UserCraftingItemsProvider: FunctionComponent<ProviderProps> = (props) => {
    const defaultContext: PersistedState<CraftingItem[]> =
        usePersistedState<CraftingItem[]>('userCraftingItems', props.init || []);

    const [craftingItems, setCraftingItems] = defaultContext;
    const [books, setBooks] = useContext(UserBooksContext);
    const [recipes, setRecipes] = useContext(UserRecipesContext);
    const [materials, setMaterials] = useContext(UserMaterialsContext);
    const wotvDump = useContext(WotvDumpContext);

    useEffect(() => {
        const newBooks: UserBookMap = {...books};
        const newRecipes: UserRecipeMap = {...recipes};
        const newMaterials: UserMaterialMap = {...materials};

        const totalElements = getTotalCraftingIngredients(craftingItems, wotvDump);

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