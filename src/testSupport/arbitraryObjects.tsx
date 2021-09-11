import {UserIngredientValues} from "../contexts/UserDataProvider";
import {CraftingItem, TotalCraftingIngredients} from "../contexts/UserCraftingItemsContext";

export const arbitraryCraftingItem = (): CraftingItem => {
    return {
        id: '',
        iname: 'AF_LW_NKN_001',
        category: 0,
        currentPlus: null,
        targetPlus: 0,
        targetGrowthType: ''
    };
};

export const arbitraryTotalCraftingIngredients = (): TotalCraftingIngredients => {
    return {
        recipes: {},
        books: {},
        materials: {},
    };
};

export const arbitraryUserIngredientValues = (): UserIngredientValues => {
    return {
        current: 0,
        totalNeeded: 0,
    };
};