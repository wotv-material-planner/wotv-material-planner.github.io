import {CraftingItem} from "../contexts/UserCraftingItemsContext";

export const arbitraryCraftingItem = (): CraftingItem => {
    return {
        iname: '',
        displayName: '',
        category: 0,
        type: 0,
        currentPlus: null,
        targetPlus: 0,
        targetGrowthType: null
    };
};