import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {RowDelete} from './RowDelete';
import {TotalCraftingIngredients} from '~contexts/UserCraftingItemsContext';
import {arbitraryTotalCraftingIngredients} from '~testSupport/arbitraryObjects';

describe('RowDelete', () => {
    it('renders a RowDelete', () => {
        renderSubject({});
    });
});

interface OptionalProps {
    itemIndex?: number;
    totalIngredients?: TotalCraftingIngredients;
};

const renderSubject = (props: OptionalProps) => {
    return render(
        <RowDelete {...makeProps(props)}/>
    );
};

const makeProps = (props: OptionalProps) => {
    return {
        itemIndex: props.itemIndex ?? 0,
        totalIngredients: props.totalIngredients || arbitraryTotalCraftingIngredients(),
    };
};