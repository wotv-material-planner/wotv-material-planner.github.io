import * as React from 'react';
import {FunctionComponent, useContext, ChangeEvent} from 'react';
import {Material, MaterialMap, UserMaterialsContext} from '../contexts/UserMaterialsContext';
import {WotvDumpContext} from '../contexts/WotvDumpContext';
import './MaterialsList.scss'

export const MaterialsList: FunctionComponent = () => {
    const {itemMaterials} = useContext(WotvDumpContext);
    const [materials, setMaterials] = useContext(UserMaterialsContext);

    return (
        <div className="MaterialsList">
            <div>Materials</div>
            {
                itemMaterials.map((material: Material, index: number) => {
                    return (
                        <div
                            key={`materialinput-${index}`}
                        >
                            <div>{material.value}</div>
                            <input
                                placeholder={material.value}
                                name={material.key}
                                defaultValue={materials[material.key].current}
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
                            <div>
                                / {materials[material.key].totalNeeded ?? 0}
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};