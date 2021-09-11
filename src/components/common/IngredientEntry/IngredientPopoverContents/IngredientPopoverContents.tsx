import * as React from 'react';
import {FunctionComponent, useContext} from 'react';
import {CraftingIngredientMap, getFullIname, getItemCraftingIngredients, UserCraftingItemsContext} from '../../../../contexts/UserCraftingItemsContext';
import {UserIngredientValues} from '../../../../contexts/UserDataProvider';
import {WotvDumpContext} from '../../../../contexts/WotvDumpContext';
import './IngredientPopoverContents.scss'

interface Props {
    ingredient: string;
    ingredientTotals: UserIngredientValues;
}

const getIngredientTotal = (ingredient, craftingItem, wotvDump) => {
    const targetPlusIname = getFullIname(craftingItem);
    const targetLevel = (craftingItem.targetPlus ?? 5) * 10;

    const targetPlusIngredients = getItemCraftingIngredients(targetPlusIname, targetLevel, wotvDump);

    let currentPlusIngredients: CraftingIngredientMap = {};

    if (craftingItem.currentPlus !== null) {
        let currentPlusIname = craftingItem.iname;

        if (craftingItem.currentPlus) {
            currentPlusIname = `${craftingItem.iname}_${craftingItem.currentPlus}`;
        }

        currentPlusIngredients = getItemCraftingIngredients(currentPlusIname, craftingItem.currentPlus * 10, wotvDump);
    }

    return (targetPlusIngredients[ingredient] || 0) - (currentPlusIngredients[ingredient] || 0);
};

export const IngredientPopoverContents: FunctionComponent<Props> = (props) => {
    const [craftingItems] = useContext(UserCraftingItemsContext);
    const wotvDump = useContext(WotvDumpContext);
    const {artifactAwakeMap, artifactRecipeMap, artifactNameMap, itemNameMap} = wotvDump;

    const toTarget = Math.max(props.ingredientTotals.totalNeeded - (props.ingredientTotals.current || 0), 0);

    return (
        <div className="IngredientPopoverContents">
            <div className="IngredientPopoverContents-title">
                {itemNameMap[props.ingredient]}
            </div>
            <div className={`IngredientPopoverContents-totals ${toTarget ? 'short' : 'reached'}`}>
                <div>
                    {`${props.ingredientTotals.current || 0} / ${props.ingredientTotals.totalNeeded || 0}`}
                </div>
                <div>
                    {`need ${toTarget}`}
                </div>
            </div>
            <div className="IngredientPopoverContents-itemList">
                {craftingItems.filter((craftingItem) => {
                    const hasRecipe = props.ingredient === artifactRecipeMap[craftingItem.iname]?.recipe;

                    const hasMaterial = artifactRecipeMap[craftingItem.iname]?.craft.some((craft) => {
                        return props.ingredient === craft.id;
                    });

                    const hasAwakening = artifactAwakeMap[craftingItem.iname]?.awakes.some((awake) => {
                        return props.ingredient === awake.mat1?.split(',')[0] ||
                            props.ingredient === awake.mat2?.split(',')[0] ||
                            props.ingredient === awake.mat3?.split(',')[0] ||
                            props.ingredient === awake.mat4?.split(',')[0];
                    });

                    return hasRecipe || hasMaterial || hasAwakening;
                }).map((craftingItem, index) => {
                    const fullIname = getFullIname(craftingItem);
                    const ingredientTotal = getIngredientTotal(props.ingredient, craftingItem, wotvDump);

                    return (
                        <div
                            className="IngredientPopoverContents-itemList-item"
                            key={`itemListItem-${index}`}
                        >
                            <div>
                                {`-${artifactNameMap[fullIname]}:`}
                            </div>
                            <div>
                                {ingredientTotal}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};