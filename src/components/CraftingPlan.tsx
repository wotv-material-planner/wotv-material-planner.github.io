import * as React from 'react';
import {FunctionComponent, useContext, useState, useEffect} from 'react';
import {UserCraftingItemsContext, CraftingItem} from '../contexts/UserCraftingItemsContext';
import {WotvDumpContext, Category, ArtifactListItem} from '../contexts/WotvDumpContext';
import './CraftingPlan.scss'

export const CraftingPlan: FunctionComponent = () => {
    const [category, setCategory] = useState<number>(0);
    const [artifact, setArtifact] = useState<string>('');
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
                {
                    artifactCategoryList.map((category: Category, index) => {
                        return (
                            <option
                                key={`CraftingPlan-category-${index}`}
                                value={index}
                            >
                                {category.value}
                            </option>
                        );
                    })
                }
            </select>
            <select
                className="CraftingPlan-artifactSelect"
                onChange={(e) => {
                    setArtifact(e.target.value);
                }}
            >
                {artifactListByCat[category] &&
                    artifactListByCat[category].reduce((acc, artifact: ArtifactListItem, index) => {
                        if (!artifact.label.includes('+')) {
                            acc.push(
                                <option
                                    key={`CraftingPlan-artifact-${index}`}
                                    value={artifact.value}
                                >
                                    {artifact.label}
                                </option>
                            );
                        }

                        return acc;
                    }, [])
                }
            </select>
            <button
                className="CraftingPlan-artifactAdd"
                onClick={() => {
                    const newCraftingItem: CraftingItem = {
                        iname: artifact,
                        currentPlus: null,
                        targetPlus: 0,
                        targetType: null
                    }

                    setCraftingItems([...craftingItems, newCraftingItem]);
                }}
            >
                Add
            </button>
        </div>
    );
};