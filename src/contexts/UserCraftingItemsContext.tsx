import * as React from 'react';
import {createContext} from 'react';
import {usePersistedState, PersistedState} from '../hooks/UsePersistedState';

export interface CraftingItem {
    iname: string;
    currentPlus: number | null;
    targetPlus: number;
    targetType: string | null;
};

export const UserCraftingItemsContext = createContext<PersistedState<CraftingItem[]>>([null, null]);

export const UserCraftingItemsProvider = (props) => {
    const defaultContext: PersistedState<CraftingItem[]> = usePersistedState<CraftingItem[]>('userCraftingItems', []);

    return (
        <UserCraftingItemsContext.Provider value={defaultContext}>
            {props.children}
        </UserCraftingItemsContext.Provider>
    );
};