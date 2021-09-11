import * as React from 'react';
import {FunctionComponent, useContext} from 'react';
import {UserCraftingItemsContext} from '../../../../../contexts/UserCraftingItemsContext';
import {TypeOption} from '../../../../../contexts/WotvDumpContext';
import './RowTypeSelect.scss';

interface Props {
    itemIndex: number;
    typeOptions: TypeOption[];
}

export const RowTypeSelect: FunctionComponent<Props> = (props) => {
    const [craftingItems, setCraftingItems] = useContext(UserCraftingItemsContext);

    return (
        <div className="RowTypeSelect">
            {props.typeOptions[0]?.label &&
                <select
                    className="RowTypeSelect-select"
                    aria-label="typeSelect"
                    value={craftingItems[props.itemIndex].targetGrowthType}
                    onChange={(event) => {
                        const newCraftingItems = [...craftingItems];
                        craftingItems[props.itemIndex].targetGrowthType = event.target.value;

                        setCraftingItems(newCraftingItems);
                    }}
                >
                    <option value="" />
                    {props.typeOptions.map((typeOption, index) => {
                        return (
                            <option
                                key={`craftingItem-${props.itemIndex}-option-${index}`}
                                value={typeOption.value}
                            >
                                {typeOption.label}
                            </option>
                        )
                    })}
                </select>
            }
        </div>
    );
};