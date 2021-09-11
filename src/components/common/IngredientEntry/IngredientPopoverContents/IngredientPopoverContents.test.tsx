import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {IngredientPopoverContents} from './IngredientPopoverContents';
import {UserDataProvider, UserIngredientValues} from '../../../../contexts/UserDataProvider';
import {CraftingItem, UserCraftingItemsContext} from '../../../../contexts/UserCraftingItemsContext';
import {PersistedState} from '../../../../hooks/UsePersistedState';
import {arbitraryCraftingItem, arbitraryUserIngredientValues} from '../../../../testSupport/arbitraryObjects';

describe('IngredientPopoverContents', () => {
    it('renders an IngredientPopoverContents', () => {
        renderSubject({});
    });
});

interface OptionalProps {
    ingredient?: string;
    ingredientTotals?: UserIngredientValues;
    value?: PersistedState<CraftingItem[]>;
};

const renderSubject = (props: OptionalProps) => {
    return render(
        <UserDataProvider>
            <UserCraftingItemsContext.Provider {...makeProps(props)}>
                <IngredientPopoverContents {...makeProps(props)} />
            </UserCraftingItemsContext.Provider>
        </UserDataProvider>
    );
};

const makeProps = (props: OptionalProps) => {
    return {
        ingredient: props.ingredient || '',
        ingredientTotals: props.ingredientTotals || arbitraryUserIngredientValues(),
        value: props.value || [[arbitraryCraftingItem()], () => {}],
    };
};