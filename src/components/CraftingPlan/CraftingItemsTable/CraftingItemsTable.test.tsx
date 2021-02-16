import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {CraftingItemsTable} from './CraftingItemsTable';
import {arbitraryCraftingItem} from '~/testSupport/arbitraryObjects';
import {CraftingItem, UserCraftingItemsProvider} from '~/contexts/UserCraftingItemsContext';
import {UserBooksProvider} from '~/contexts/UserBooksContext';
import {UserRecipesProvider} from '~/contexts/UserRecipesContext';
import {UserMaterialsProvider} from '~/contexts/UserMaterialsContext';

describe('CraftingItemsTable', () => {
    it('renders a CraftingTableItem', () => {
        renderSubject({});

        expect(screen.getByText('Kunai')).toBeTruthy();
    });
});

interface OptionalProps {
    init?: CraftingItem[];
};

const renderSubject = (props: OptionalProps) => {
    return render(
        <UserBooksProvider>
            <UserRecipesProvider>
                <UserMaterialsProvider>
                    <UserCraftingItemsProvider {...makeProps(props)}>
                        <CraftingItemsTable />
                    </UserCraftingItemsProvider>
                </UserMaterialsProvider>
            </UserRecipesProvider>
        </UserBooksProvider>
    );
};

const makeProps = (props: OptionalProps) => {
    return {
        init: props.init || [arbitraryCraftingItem()],
    };
};