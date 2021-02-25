import * as React from 'react';
import {FunctionComponent, useContext, useState} from 'react';
import {CraftingItem, UserCraftingItemsContext} from '~contexts/UserCraftingItemsContext';
import {ArtifactListItem, Category, WotvDumpContext} from '~contexts/WotvDumpContext';
import './AddCraftingItems.scss';

const getGroupOptions = (groupCategories: Category[], artifactCategoryList) => {
    return groupCategories.map((groupCategory: Category) => {
        const index = artifactCategoryList.findIndex((category) => {
            return groupCategory.key === category.key;
        });

        return (
            <option
                key={`CraftingPlan-category-${index}`}
                value={index}
            >
                {groupCategory.value}
            </option>
        );
    });
};

export const AddCraftingItems: FunctionComponent = () => {
    const [category, setCategory] = useState<number>(1);
    const [artifactId, setArtifactId] = useState<string>('');
    const [craftingItems, setCraftingItems] = useContext(UserCraftingItemsContext);
    const {artifactCategoryList, artifactListByCat} = useContext(WotvDumpContext);

    const weapons = artifactCategoryList.filter((category) => {
        return category.type === 'weapon';
    });

    const armors = artifactCategoryList.filter((category) => {
        return category.type === 'armor';
    });

    const accessories = artifactCategoryList.filter((category) => {
        return category.type === 'accessory';
    });

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
                <optgroup label="Weapons">
                    {getGroupOptions(weapons, artifactCategoryList)}
                </optgroup>
                <optgroup label="Armors">
                    {getGroupOptions(armors, artifactCategoryList)}
                </optgroup>
                <optgroup label="Accessories">
                    {getGroupOptions(accessories, artifactCategoryList)}
                </optgroup>
            </select>
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