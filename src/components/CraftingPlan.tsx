import * as React from 'react';
import {FunctionComponent, useContext, useState} from 'react';
import {UserCraftingItemsContext, CraftingItem} from '../contexts/UserCraftingItemsContext';
import {WotvDumpContext, Category, ArtifactListItem} from '../contexts/WotvDumpContext';
import {CraftingItemsTable} from './CraftingItemsTable';
import './CraftingPlan.scss'

export const CraftingPlan: FunctionComponent = () => {
    const [category, setCategory] = useState<number>(0);
    const [artifactId, setArtifactId] = useState<string>('');
    const [craftingItems, setCraftingItems] = useContext(UserCraftingItemsContext);
    const {artifactCategoryList, artifactListByCat} = useContext(WotvDumpContext);

    return (
        <div className="CraftingPlan">
            <div>Crafting Plan</div>
            <select 
                className="CraftingPlan-categorySelect"
                onChange={(e) => {
                    setCategory(+e.target.value);
                }}
            >
                {artifactCategoryList.map((category: Category, index) => {
                    return (
                        <option
                            key={`CraftingPlan-category-${index}`}
                            value={index}
                        >
                            {category.value}
                        </option>
                    );
                })}
            </select>
            {category !== 0 &&
                <select
                    className="CraftingPlan-artifactSelect"
                    defaultValue=""
                    onChange={(e) => {
                        setArtifactId(e.target.value);
                    }}
                >
                    {artifactListByCat[category] &&
                        artifactListByCat[category].reduce((acc, artifact: ArtifactListItem, index, arr) => {
                            if (!artifact.label.includes('+')) {
                                const plusItem = arr.some((ele) => {
                                    return ele.label.includes(`${artifact.label} +`);
                                });

                                acc.push(
                                    <option
                                        key={`CraftingPlan-artifact-${index}`}
                                        value={artifact.value}
                                    >
                                        {`${artifact.label}${plusItem ? ' +' : ''}`}
                                    </option>
                                );
                            }

                            return acc;
                        }, [(
                            <option value="" key="CraftingPlan-artifact-default">
                                {`choose ${artifactCategoryList[category].value}`}
                            </option>
                        )])
                    }
                </select>
            }
            <button
                className="CraftingPlan-artifactAdd"
                onClick={() => {
                    if (artifactId) {
                        const newCraftingItem: CraftingItem = {
                            iname: artifactId,
                            category: category,
                            currentPlus: null,
                            targetPlus: 0,
                            targetGrowthType: '',
                        };
    
                        setCraftingItems([...craftingItems, newCraftingItem]);
                    }
                }}
            >
                Add
            </button>

            <CraftingItemsTable />
        </div>
    );
};