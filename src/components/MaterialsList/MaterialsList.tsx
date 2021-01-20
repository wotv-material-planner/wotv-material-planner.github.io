import * as React from 'react';
import {FunctionComponent, useContext, ChangeEvent} from 'react';
import {Material, UserMaterialMap, UserMaterialsContext} from '~/contexts/UserMaterialsContext';
import {WotvDumpContext} from '~/contexts/WotvDumpContext';
import {IngredientEntry} from '~/components/common/IngredientEntry';
import './MaterialsList.scss'

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
                            title={itemMaterialMap[material].name}
                            current={materials[material].current}
                            totalNeeded={materials[material].totalNeeded}
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