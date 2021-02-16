import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {RowBook} from './RowBook';
import {CraftingIngredientMap} from '~contexts/UserCraftingItemsContext';

describe('RowBook', () => {
    it('renders a RowBook', () => {
        renderSubject({});
    });
});

interface OptionalProps {
    totalBooks?: CraftingIngredientMap;
};

const renderSubject = (props: OptionalProps) => {
    return render(
        <RowBook {...makeProps(props)}/>
    );
};

const makeProps = (props: OptionalProps) => {
    return {
        totalBooks: props.totalBooks || {},
    };
};