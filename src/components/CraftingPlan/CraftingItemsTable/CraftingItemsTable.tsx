import * as React from 'react';
import {FunctionComponent, useContext, useState} from 'react';
import {CraftingItem, UserCraftingItemsContext} from '~/contexts/UserCraftingItemsContext';
import {CraftingItemRow} from './CraftingItemRow';
import './CraftingItemsTable.scss';

export const CraftingItemsTable: FunctionComponent = () => {
    const [craftingItems, setCraftingItems] = useContext(UserCraftingItemsContext);
    const [moveItemIndex, setMoveItemIndex] = useState<number>(null);

    return (
        <div className="CraftingItemsTable">
            {craftingItems.map((craftingItem: CraftingItem, itemIndex: number) => {
                return (
                    <CraftingItemRow
                        key={craftingItem.iname}
                        craftingItem={craftingItem}
                        itemIndex={itemIndex}
                        moveItemIndex={moveItemIndex}
                        setMoveItemIndex={(index) => {
                            setMoveItemIndex(index);
                        }}
                    />
                );
            })}
        </div>
    );
};