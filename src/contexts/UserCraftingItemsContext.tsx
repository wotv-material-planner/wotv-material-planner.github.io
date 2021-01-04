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

interface MaterialValue {
    num: number;
}

interface MaterialValueMap {
    [num: string]: MaterialValue;
}

interface ItemMaterialsMap {
    awake: MaterialValueMap;
    recipe: MaterialValueMap;
    total: MaterialValueMap;
};

interface TotalMaterialsValue {
    [material: string]: number;
};

interface TotalMaterialsMap {
    books: TotalMaterialsValue;
    recipes: TotalMaterialsValue;
    materials: TotalMaterialsValue;
};

export const UserCraftingItemsContext = createContext<PersistedState<CraftingItem[]>>([null, null]);

interface ProviderProps {
    init?: CraftingItem[];
}

export const UserCraftingItemsProvider: FunctionComponent<ProviderProps> = (props) => {
    const defaultContext: PersistedState<CraftingItem[]> = 
        usePersistedState<CraftingItem[]>('userCraftingItems', props.init || []);

    const [craftingItems, setCraftingItems] = defaultContext;
    const [books, setBooks] = useContext(UserBooksContext);
    const [recipes, setRecipes] = useContext(UserRecipesContext);
    const [materials, setMaterials] = useContext(UserMaterialsContext);
    const {artifactRecipeMap, artifactAwakeMap} = useContext(WotvDumpContext);

    const getTotalMaterials = (iname: string, level: number): ItemMaterialsMap => {
        const mats: ItemMaterialsMap = {
            awake: {},
            recipe: {},
            total: {},
        };

        if (artifactRecipeMap[iname]) {
            artifactRecipeMap[iname].craft.forEach((material) => {
                switch (material.type) {
                    case 0:
                        if (mats.total[material.id]) {
                            mats.total[material.id].num += parseInt(material.num);
                        } else {
                            mats.total[material.id] = JSON.parse(JSON.stringify(material));
                        }
                        break;
                    case 1:
                        let item_mats = getTotalMaterials(material.id, material.lv);

                        for (let key in item_mats.total) {
                            if (mats.total[key]) {
                                mats.total[key].num += item_mats.total[key].num;
                            } else {
                                mats.total[key] = JSON.parse(JSON.stringify(item_mats.total[key]));
                            }
                        }
                        break;
                }

                if (mats.recipe[material.id]) {
                    mats.recipe[material.id].num += material.num;
                } else {
                    mats.recipe[material.id] = JSON.parse(JSON.stringify(material));
                }
            });
        }

        if (artifactAwakeMap[iname]) {
            artifactAwakeMap[iname].awakes.forEach((awake, i) => {
                if (awake.lv <= level) {
                    let mat_index = 1;
                    while (awake['mat' + mat_index] && mat_index <= 9) {
                        let mat = awake['mat' + mat_index].split(',');

                        if (mats.awake[mat[0]]) {
                            mats.awake[mat[0]].num += parseInt(mat[1]);
                        } else {
                            mats.awake[mat[0]] = {
                                num: parseInt(mat[1])
                            };
                        }
                        if (mats.total[mat[0]]) {
                            mats.total[mat[0]].num += parseInt(mat[1]);
                        } else {
                            mats.total[mat[0]] = {
                                num: parseInt(mat[1])
                            };
                        }

                        mat_index++;
                    }
                }
            });
        }

        return mats;
    };

    useEffect(() => {
        const newBooks: BookMap = {...books};
        const newRecipes: RecipeMap = {...recipes};
        const newMaterials: MaterialMap = {...materials};

        const totalMaterials: TotalMaterialsMap = craftingItems.reduce((acc: TotalMaterialsMap, curr: CraftingItem) => {
            let targetIname = curr.iname;

            if (curr.targetPlus) {
                targetIname = `${curr.iname}_${curr.targetPlus}`;
            }

            const targetMaterials: ItemMaterialsMap = getTotalMaterials(targetIname, 50);

            let currentMaterials: ItemMaterialsMap = {
                awake: {},
                recipe: {},
                total: {},
            };

            if (curr.currentPlus !== null) {
                let currentIname = curr.iname;

                if (curr.currentPlus) {
                    currentIname = `${curr.iname}_${curr.currentPlus}`;
                }

                currentMaterials = getTotalMaterials(currentIname, curr.currentPlus * 10);
            }

            for (let key in targetMaterials.total) {
                const needed = targetMaterials.total[key].num - (currentMaterials.total[key]?.num || 0);

                if (key.startsWith('IT_AF_AW')) {
                    if (acc.books[key]) {
                        acc.books[key] += needed;
                    } else {
                        acc.books[key] = needed;
                    }
                }

                if (key.startsWith('IT_AF_LW')) {
                    if (acc.recipes[key]) {
                        acc.recipes[key] += needed;
                    } else {
                        acc.recipes[key] = needed;
                    }
                }

                if (key.startsWith('IT_AF_MAT')) {
                    if (acc.materials[key]) {
                        acc.materials[key] += needed;
                    } else {
                        acc.materials[key] = needed;
                    }
                }
            }

            return acc;
        }, {books: {}, recipes: {}, materials: {}} as TotalMaterialsMap);

        for (let book in totalMaterials.books) {
            newBooks[book].totalNeeded = totalMaterials.books[book];
        }

        setBooks(newBooks);

        for (let recipe in totalMaterials.recipes) {
            newRecipes[recipe].totalNeeded = totalMaterials.recipes[recipe];
        }

        setRecipes(newRecipes);

        for (let material in totalMaterials.materials) {
            newMaterials[material].totalNeeded = totalMaterials.materials[material];
        }

        setMaterials(newMaterials);
    }, [craftingItems]);

    return (
        <UserCraftingItemsContext.Provider value={defaultContext}>
            {props.children}
        </UserCraftingItemsContext.Provider>
    );
};