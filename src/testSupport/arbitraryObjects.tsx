import {CraftingItem} from "../contexts/UserCraftingItemsContext";

export const arbitraryCraftingItem = (): CraftingItem => {
    return {
        iname: '',
        category: 0,
        currentPlus: null,
        targetPlus: 0,
        targetGrowthType: null
    };
};