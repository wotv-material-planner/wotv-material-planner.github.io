import * as React from 'react';
import {FunctionComponent, useContext, ChangeEvent} from 'react';
import {Material, MaterialMap, UserMaterialsContext} from '~/contexts/UserMaterialsContext';
import {WotvDumpContext} from '~/contexts/WotvDumpContext';
import {IngredientEntry} from '~/components/common/IngredientEntry';
import './MaterialsList.scss'

export const MaterialsList: FunctionComponent = () => {
    const {itemMaterials} = useContext(WotvDumpContext);
    const [materials, setMaterials] = useContext(UserMaterialsContext);

    return (
        <div className="MaterialsList">
            {
                itemMaterials.map((material: Material, index: number) => {
                    return (
                        <IngredientEntry
                            key={`materialEntry-${index}`}
                            title={material.value}
                            current={materials[material.key].current}
                            totalNeeded={materials[material.key].totalNeeded}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                const newMaterials: MaterialMap = {...materials};

                                if (event.target.value === '') {
                                    newMaterials[material.key].current = null;
                                } else {
                                    newMaterials[material.key].current = +event.target.value;
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