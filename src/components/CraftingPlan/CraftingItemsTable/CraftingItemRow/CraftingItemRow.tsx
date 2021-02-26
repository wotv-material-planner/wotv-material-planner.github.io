import * as React from 'react';
import {FunctionComponent, useContext, useState} from 'react';
import {CraftingItem, getTotalCraftingIngredients} from '~contexts/UserCraftingItemsContext';
import {WotvDumpContext, stats} from '~contexts/WotvDumpContext';
import {RowBook} from './RowBook';
import {RowMaterials} from './RowMaterials';
import {RowRecipe} from './RowRecipe';
import {RowMovementControls} from './RowMovementControls';
import {RowPlusSelects} from './RowPlusSelects';
import {RowTypeSelect} from './RowTypeSelect';
import './CraftingItemRow.scss';
import {RowDelete} from './RowDelete';
import {RowItemInfo} from './RowItemInfo';

interface Props {
    craftingItem: CraftingItem;
    itemIndex: number;
    moveItemIndex?: number;
    setMoveItemIndex: (moveItemIndex: number) => void;
};

export const CraftingItemRow: FunctionComponent<Props> = (props) => {
    const [showInfo, setShowInfo] = useState<boolean>(false);

    const wotvDump = useContext(WotvDumpContext);
    const {artifactMap, typeMap} = wotvDump;

    let fullIname = props.craftingItem.iname;

    if (props.craftingItem.targetPlus > 0) {
        fullIname += `_${props.craftingItem.targetPlus}`;
    }

    const artifact = artifactMap[fullIname];

    const totalIngredients = getTotalCraftingIngredients([props.craftingItem], wotvDump);

    return (
        <div className="CraftingItemRow">
            <div className="CraftingItemRow-main">
                <RowMovementControls
                    itemIndex={props.itemIndex}
                    moveItemIndex={props.moveItemIndex}
                    setMoveItemIndex={props.setMoveItemIndex}
                />
                <div>
                    <div className="CraftingItemRow-main-head">
                        <div className="CraftingItemRow-main-head-itemName">
                            {artifact.name}
                        </div>
                        <i
                            className="material-icons CraftingItemRow-main-head-itemInfo"
                            onClick={() => {
                                setShowInfo(!showInfo);
                            }}
                        >
                            help_outline
                        </i>
                        <RowTypeSelect
                            itemIndex={props.itemIndex}
                            typeOptions={typeMap[artifact.rtype]}
                        />
                        <RowPlusSelects
                            itemIndex={props.itemIndex}
                            displaySelect={!!artifactMap[`${props.craftingItem.iname}_1`]}
                        />
                    </div>
                    <div className="CraftingItemRow-main-contents">
                        <div className="CraftingItemRow-main-contents-inputs">
                            <RowRecipe
                                totalRecipes={totalIngredients.recipes}
                                asset={`equipment/${artifact.asset}.png`}
                            />
                            <RowBook
                                totalBooks={totalIngredients.books}
                            />
                            <RowMaterials
                                totalMaterials={totalIngredients.materials}
                            />
                        </div>
                    </div>
                </div>
                <RowDelete
                    itemIndex={props.itemIndex}
                    totalIngredients={totalIngredients}
                />
            </div>
            {showInfo &&
                <RowItemInfo
                    iname={fullIname}
                    type={props.craftingItem.targetGrowthType}
                />
            }
        </div>
    );
};