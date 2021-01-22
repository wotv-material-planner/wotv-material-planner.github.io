import * as React from 'react';
import {FunctionComponent, useContext} from 'react';
import {UserCraftingItemsContext} from '~contexts/UserCraftingItemsContext';
import './RowPlusSelects.scss';

interface Props {
    itemIndex: number;
    displaySelect: boolean;
};

export const RowPlusSelects: FunctionComponent<Props> = (props) => {
    const [craftingItems, setCraftingItems] = useContext(UserCraftingItemsContext);

    return (
        <div className="RowPlusSelects">
            {props.displaySelect &&
                <div className="CraftingItemsTable-row-head-plusSelect">
                    <div className="CraftingItemsTable-row-head-plusLabel">
                        Current
                    </div>
                    <select
                        className="CraftingItemsTable-row-head-select"
                        value={craftingItems[props.itemIndex].currentPlus ?? ''}
                        onChange={(event) => {
                            const newCraftingItems = [...craftingItems];

                            if (event.target.value === '') {
                                newCraftingItems[props.itemIndex].currentPlus = null;
                            } else {
                                newCraftingItems[props.itemIndex].currentPlus = +event.target.value;
                            }

                            if (newCraftingItems[props.itemIndex].targetPlus < +event.target.value) {
                                newCraftingItems[props.itemIndex].targetPlus = +event.target.value
                            }

                            setCraftingItems(newCraftingItems);
                        }}
                    >
                        <option value=""></option>
                        <option value="0">+0</option>
                        <option value="1">+1</option>
                        <option value="2">+2</option>
                        <option value="3">+3</option>
                        <option value="4">+4</option>
                        <option value="5">+5</option>
                    </select>
                </div>
            }
            {props.displaySelect &&
                <div className="CraftingItemsTable-row-head-plusSelect">
                    <div className="CraftingItemsTable-row-head-plusLabel">
                        Target
                    </div>
                    <select
                        className="CraftingItemsTable-row-head-select"
                        value={craftingItems[props.itemIndex].targetPlus ?? ''}
                        onChange={(event) => {
                            const newCraftingItems = [...craftingItems];
                            newCraftingItems[props.itemIndex].targetPlus = +event.target.value;

                            if (newCraftingItems[props.itemIndex].currentPlus > +event.target.value) {
                                newCraftingItems[props.itemIndex].currentPlus = +event.target.value;
                            }

                            setCraftingItems(newCraftingItems);
                        }}
                    >
                        <option value=""></option>
                        <option value="0">+0</option>
                        <option value="1">+1</option>
                        <option value="2">+2</option>
                        <option value="3">+3</option>
                        <option value="4">+4</option>
                        <option value="5">+5</option>
                    </select>
                </div>
            }
        </div>
    )
};