import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {RowRecipe} from './RowRecipe';
import {CraftingIngredientMap} from '~contexts/UserCraftingItemsContext';

describe('RowRecipe', () => {
    it('renders a RowRecipe', () => {
        renderSubject({});
    });
});

interface OptionalProps {
    totalRecipes?: CraftingIngredientMap;
    asset?: string;
};

const renderSubject = (props: OptionalProps) => {
    return render(
        <RowRecipe {...makeProps(props)}/>
    );
};

const makeProps = (props: OptionalProps) => {
    return {
        totalRecipes: props.totalRecipes || {},
        asset: props.asset || '',
    };
};