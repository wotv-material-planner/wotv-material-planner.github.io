import * as React from 'react';
import {FunctionComponent, useContext, useState} from 'react';
import {CraftingItem, UserCraftingItemsContext} from '~contexts/UserCraftingItemsContext';
import {ArtifactListItem, Category, WotvDumpContext} from '~contexts/WotvDumpContext';
import './AddCraftingItems.scss';

export const AddCraftingItems: FunctionComponent = () => {
    const [category, setCategory] = useState<number>(0);
    const [artifactId, setArtifactId] = useState<string>('');
    const [craftingItems, setCraftingItems] = useContext(UserCraftingItemsContext);
    const {artifactCategoryList, artifactListByCat} = useContext(WotvDumpContext);

    return (
        <div className="AddCraftingItems">
            <div className="AddCraftingItems-title">
                Add Items
            </div>
            <select
                className="AddCraftingItems-categorySelect"
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
                    className="AddCraftingItems-artifactSelect"
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
                                        key={`AddCraftingItems-artifact-${index}`}
                                        value={artifact.value}
                                    >
                                        {`${artifact.label}${plusItem ? ' +' : ''}`}
                                    </option>
                                );
                            }

                            return acc;
                        }, [(
                            <option value="" key="AddCraftingItems-artifact-default">
                                {`choose ${artifactCategoryList[category].value}`}
                            </option>
                        )])
                    }
                </select>
            }
            <button
                className="AddCraftingItems-artifactAdd"
                onClick={() => {
                    if (artifactId) {
                        const newCraftingItem: CraftingItem = {
                            iname: artifactId,
                            category: category,
                            currentPlus: null,
                            targetPlus: null,
                            targetGrowthType: '',
                        };

                        setCraftingItems([newCraftingItem, ...craftingItems]);
                    }
                }}
            >
                Add
            </button>
        </div>
    );
};