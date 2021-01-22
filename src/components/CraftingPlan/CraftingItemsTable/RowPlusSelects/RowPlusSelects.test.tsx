import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {RowPlusSelects} from './RowPlusSelects';
import {CraftingItem, UserCraftingItemsContext, UserCraftingItemsProvider} from '~contexts/UserCraftingItemsContext';
import {arbitraryCraftingItem} from '~testSupport/arbitraryObjects';
import {UserBooksProvider} from '~contexts/UserBooksContext';
import {UserRecipesProvider} from '~contexts/UserRecipesContext';
import {UserMaterialsProvider} from '~contexts/UserMaterialsContext';
import {PersistedState} from '~hooks/UsePersistedState';

describe('RowPlusSelects', () => {
    it('renders a RowPlusSelects', () => {
        renderSubject({});
    });
});

interface OptionalProps {
    itemIndex?: number;
    displaySelect?: boolean;
    value?: PersistedState<CraftingItem[]>;
};

const renderSubject = (props: OptionalProps) => {
    return render(
        <UserBooksProvider>
            <UserRecipesProvider>
                <UserMaterialsProvider>
                    <UserCraftingItemsContext.Provider {...makeProps(props)}>
                        <RowPlusSelects {...makeProps(props)}/>
                    </UserCraftingItemsContext.Provider>
                </UserMaterialsProvider>
            </UserRecipesProvider>``
        </UserBooksProvider>
    );
};

const makeProps = (props: OptionalProps) => {
    return {
        itemIndex: props.itemIndex ?? 0,
        displaySelect: props.displaySelect ?? true,
        value: props.value || [[arbitraryCraftingItem()], null],
    };
};