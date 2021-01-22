import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {RowMaterials} from './RowMaterials';
import {CraftingIngredientMap} from '~contexts/UserCraftingItemsContext';

describe('RowMaterials', () => {
    it('renders a RowMaterials', () => {
        renderSubject({});
    });
});

interface OptionalProps {
    totalMaterials?: CraftingIngredientMap;
};

const renderSubject = (props: OptionalProps) => {
    return render(
        <RowMaterials {...makeProps(props)}/>
    );
};

const makeProps = (props: OptionalProps) => {
    return {
        totalMaterials: props.totalMaterials || {},
    };
};