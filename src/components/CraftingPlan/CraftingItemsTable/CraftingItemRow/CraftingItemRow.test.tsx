import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {CraftingItemRow} from './CraftingItemRow';
import {arbitraryCraftingItem, arbitraryTotalCraftingIngredients} from '~/testSupport/arbitraryObjects';
import {CraftingItem, UserCraftingItemsProvider} from '~/contexts/UserCraftingItemsContext';
import {UserBooksProvider} from '~/contexts/UserBooksContext';
import {UserRecipesProvider} from '~/contexts/UserRecipesContext';
import {UserMaterialsProvider} from '~/contexts/UserMaterialsContext';

describe('CraftingItemRow', () => {
    it('renders a CraftingTableItem', () => {
        renderSubject({});

        expect(screen.getByText('Kunai')).toBeTruthy();
    });
});

interface OptionalProps {
    craftingItem?: CraftingItem;
    itemIndex?: number;
    moveItemIndex?: number;
    setMoveItemIndex?: (index: number) => void;
    init?: CraftingItem[];
};

const renderSubject = (props: OptionalProps) => {
    return render(
        <UserBooksProvider>
            <UserRecipesProvider>
                <UserMaterialsProvider>
                    <UserCraftingItemsProvider {...makeProps(props)}>
                        <CraftingItemRow {...makeProps(props)}/>
                    </UserCraftingItemsProvider>
                </UserMaterialsProvider>
            </UserRecipesProvider>
        </UserBooksProvider>
    );
};

const makeProps = (props: OptionalProps) => {
    return {
        craftingItem: props.craftingItem || arbitraryCraftingItem(),
        itemIndex: props.itemIndex ?? 0,
        moveItemIndex: props.moveItemIndex ?? 0,
        setMoveItemIndex: props.setMoveItemIndex || (() => {}),
        init: props.init || [arbitraryCraftingItem()],
    };
};