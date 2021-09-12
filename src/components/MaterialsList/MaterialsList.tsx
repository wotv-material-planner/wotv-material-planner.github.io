import * as React from 'react';
import {FunctionComponent, useContext, ChangeEvent} from 'react';
import {UserMaterialsContext} from '../../contexts/UserMaterialsContext';
import {WotvDumpContext} from '../../contexts/WotvDumpContext';
import {IngredientEntry} from '../common/IngredientEntry';
import './MaterialsList.scss'
import {UserIngredientMap} from '../../contexts/UserDataProvider';

export const MaterialsList: FunctionComponent = () => {
    const {itemMaterialMap} = useContext(WotvDumpContext);
    const itemMaterials = Object.keys(itemMaterialMap);
    const [materials, setMaterials] = useContext(UserMaterialsContext);

    return (
        <div className="MaterialsList">
            {
                itemMaterials.map((material: string, index: number) => {
                    return (
                        <IngredientEntry
                            key={`materialEntry-${index}`}
                            ingredient={material}
                            ingredientTotals={materials[material]}
                            title={itemMaterialMap[material].name}
                            totalNeeded={materials[material].totalNeeded}
                            asset={`img/items/${material}.png`}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                const newMaterials: UserIngredientMap = {...materials};

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