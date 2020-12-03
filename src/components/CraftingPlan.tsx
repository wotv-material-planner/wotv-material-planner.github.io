import * as React from 'react';
import {FunctionComponent, useContext} from 'react';
import {WotvDumpContext, Category} from '../contexts/WotvDumpContext';
import './CraftingPlan.scss'

export const CraftingPlan: FunctionComponent = () => {
    const {artifactCategoryList} = useContext(WotvDumpContext);

    return (
        <div className="CraftingPlan">
            <div>Crafting Plan</div>
            <select className="CraftingPlan-categorySelect">
                {
                    artifactCategoryList.map((category: Category, index) => {
                        return (
                            <option
                                key={`CraftingPlan-category-${index}`}
                                value={category.key}
                            >
                                {category.value}
                            </option>
                        );
                    })
                }
            </select>
        </div>
    );
};