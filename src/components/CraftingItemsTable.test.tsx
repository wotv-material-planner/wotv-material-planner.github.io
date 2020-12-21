import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {CraftingItemsTable} from './CraftingItemsTable';
import {CraftingItem} from '../contexts/UserCraftingItemsContext';

describe('CraftingItemsTable', () => {
    it('renders a CraftingTableItem', () => {
        renderSubject({});

        expect(screen.getByText('Crafting Items')).toBeTruthy();
    });
});

interface OptionalProps {
    craftingItems?: CraftingItem[];
};

const renderSubject = (props: OptionalProps) => {
    return render(
        <CraftingItemsTable {...makeProps(props)} />
    );
};

const makeProps = (props: OptionalProps) => {
    return {
        craftingItems: props.craftingItems || []
    };
};