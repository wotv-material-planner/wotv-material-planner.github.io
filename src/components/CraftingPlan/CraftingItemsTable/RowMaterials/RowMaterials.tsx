import * as React from 'react';
import {FunctionComponent, useContext, ChangeEvent} from 'react';
import {IngredientEntry} from '~components/common/IngredientEntry';
import {CraftingIngredientMap} from '~contexts/UserCraftingItemsContext';
import {UserMaterialMap, UserMaterialsContext} from '~contexts/UserMaterialsContext';
import {WotvDumpContext} from '~contexts/WotvDumpContext';
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
                            title={itemNameMap[material]}
                            current={materials[material].current}
                            totalNeeded={props.totalMaterials[material]}
                            asset={`items/${material}.png`}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                const newMaterials: UserMaterialMap = {...materials};

                                if (event.target.value === '') {
                                    newMaterials[material].current = null;
                                } else {
                                    newMaterials[material].current = +event.target.value;
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