import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {CraftingItemsTable} from './CraftingItemsTable';
import {CraftingItem, UserCraftingItemsProvider} from '../contexts/UserCraftingItemsContext';
import {arbitraryCraftingItem} from '../testSupport/arbitraryObjects';

describe('CraftingItemsTable', () => {
    it('renders a CraftingTableItem', () => {
        const craftingItems: CraftingItem[] = [
            {
                ...arbitraryCraftingItem(),
                displayName: 'Slothbear Sword'
            }
        ];
        
        renderSubject({init: craftingItems});

        expect(screen.getByText('Slothbear Sword')).toBeTruthy();
    });
});

interface OptionalProps {
    init?: CraftingItem[];
};

const renderSubject = (props: OptionalProps) => {
    return render(
        <UserCraftingItemsProvider {...makeProps(props)}>
            <CraftingItemsTable />
        </UserCraftingItemsProvider>
    );
};

const makeProps = (props: OptionalProps) => {
    return {
        init: props.init
    };
};