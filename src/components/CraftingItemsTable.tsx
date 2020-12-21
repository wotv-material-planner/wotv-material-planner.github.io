import * as React from 'react';
import {FunctionComponent} from 'react';
import {CraftingItem} from '../contexts/UserCraftingItemsContext';
import './CraftingItemsTable.scss';

interface Props {
    craftingItems: CraftingItem[];
}

export const CraftingItemsTable: FunctionComponent<Props> = (props: Props) => {
    return (
        <div className="CraftingItemsTable">
            <div>Crafting Items</div>
            {
                props.craftingItems.map((craftingItem: CraftingItem) => {
                    return (
                        <div>
                            {craftingItem.iname}
                        </div>
                    );
                })
            }
        </div>
    );
};