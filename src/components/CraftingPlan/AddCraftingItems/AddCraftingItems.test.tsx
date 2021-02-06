import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {AddCraftingItems} from './AddCraftingItems';

describe('AddCraftingItems', () => {
    it('renders a AddCraftingItems', () => {
        renderSubject({});
    });
});

interface OptionalProps {};

const renderSubject = (props: OptionalProps) => {
    return render(
        <AddCraftingItems {...makeProps(props)}/>
    );
};

const makeProps = (props: OptionalProps) => {
    return {};
};