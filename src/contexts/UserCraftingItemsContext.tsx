import * as React from 'react';
import {createContext, FunctionComponent} from 'react';
import {usePersistedState, PersistedState} from '../hooks/UsePersistedState';

export interface CraftingItem {
    iname: string;
    category: number;
    currentPlus: number | null;
    targetPlus: number;
    targetGrowthType: string
};

export const UserCraftingItemsContext = createContext<PersistedState<CraftingItem[]>>([null, null]);

interface ProviderProps {
    init?: CraftingItem[];
}

export const UserCraftingItemsProvider: FunctionComponent<ProviderProps> = (props) => {
    const defaultContext: PersistedState<CraftingItem[]> = 
        usePersistedState<CraftingItem[]>('userCraftingItems', props.init || []);

    return (
        <UserCraftingItemsContext.Provider value={defaultContext}>
            {props.children}
        </UserCraftingItemsContext.Provider>
    );
};