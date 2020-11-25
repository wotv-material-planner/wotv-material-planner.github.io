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
            {
                itemMaterials.map((material: Material, index: number) => {
                    return (
                        <input 
                            placeholder={material.value}
                            name={material.key}
                            key={`materialinput-${index}`}
                            defaultValue={materials[material.key]}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                const newMaterials: MaterialMap = {...materials};
                                newMaterials[material.key] = +event.target.value;

                                setMaterials(newMaterials);
                            }}
                        />
                    );
                })
            }
        </div>
    );
};