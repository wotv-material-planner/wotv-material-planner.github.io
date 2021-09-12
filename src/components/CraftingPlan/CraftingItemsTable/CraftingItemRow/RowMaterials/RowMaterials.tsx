import * as React from 'react';
import {FunctionComponent, useContext, ChangeEvent} from 'react';
import {IngredientEntry} from '../../../../common/IngredientEntry';
import {CraftingIngredientMap} from '../../../../../contexts/UserCraftingItemsContext';
import {UserIngredientMap} from '../../../../../contexts/UserDataProvider';
import {UserMaterialsContext} from '../../../../../contexts/UserMaterialsContext';
import {WotvDumpContext} from '../../../../../contexts/WotvDumpContext';
import './RowMaterials.scss'

interface Props {
    totalMaterials: CraftingIngredientMap;
}

export const RowMaterials: FunctionComponent<Props> = (props) => {
    const [materials, setMaterials] = useContext(UserMaterialsContext);
    const {itemNameMap} = useContext(WotvDumpContext);

    const craftingMaterials = Object.keys(props.totalMaterials);

    return (
        <div className="RowMaterials">
            {
                craftingMaterials.map((material) => {
                    return (
                        <IngredientEntry
                            key={`rowMaterial-${material}`}
                            ingredient={material}
                            ingredientTotals={materials[material]}
                            title={itemNameMap[material]}
                            totalNeeded={props.totalMaterials[material]}
                            asset={`img/items/${material}.png`}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                const newMaterials: UserIngredientMap = {...materials};
                                const newCurrentValue = +event.target.value;

                                if (Number.isNaN(newCurrentValue) || event.target.value === '') {
                                    newMaterials[material].current = null;
                                } else {
                                    newMaterials[material].current = newCurrentValue;
                                }

                                setMaterials(newMaterials);
                            }}
                        />
                    );
                })
            }
        </div>
    );
};