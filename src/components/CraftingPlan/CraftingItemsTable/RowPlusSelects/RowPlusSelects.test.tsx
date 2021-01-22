import * as React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {RowPlusSelects} from './RowPlusSelects';
import {CraftingItem, UserCraftingItemsContext} from '~contexts/UserCraftingItemsContext';
import {arbitraryCraftingItem} from '~testSupport/arbitraryObjects';
import {UserBooksProvider} from '~contexts/UserBooksContext';
import {UserRecipesProvider} from '~contexts/UserRecipesContext';
import {UserMaterialsProvider} from '~contexts/UserMaterialsContext';
import {PersistedState} from '~hooks/UsePersistedState';

describe('RowPlusSelects', () => {
    it('renders a RowPlusSelects', () => {
        renderSubject({});
    });

    it('renders two selects for the craftingItem', () => {
        const craftingItems: CraftingItem[] = [{
            ...arbitraryCraftingItem(),
        }];

        renderSubject({value: [craftingItems, null]});

        expect(screen.getAllByRole('combobox')).toHaveLength(2);
    });

    it('renders a Current plusSelect for the craftingItem', () => {
        const craftingItems: CraftingItem[] = [{
            ...arbitraryCraftingItem(),
            currentPlus: 1,
        }];

        renderSubject({value: [craftingItems, null]});

        expect(screen.getByText('Current')).toBeTruthy();
        expect(screen.getByDisplayValue('+1')).toBeTruthy();
    });

    it('renders a Target plusSelect for the craftingItem', () => {
        const craftingItems: CraftingItem[] = [{
            ...arbitraryCraftingItem(),
            targetPlus: 2,
        }];

        renderSubject({value: [craftingItems, null]});

        expect(screen.getByText('Target')).toBeTruthy();
        expect(screen.getByDisplayValue('+2')).toBeTruthy();
    });

    it('doesnt render plus selects when displaySelect is false', () => {
        const craftingItems: CraftingItem[] = [{
            ...arbitraryCraftingItem(),
            currentPlus: 1,
            targetPlus: 2,
        }];

        renderSubject({displaySelect: false, value: [craftingItems, null]});

        expect(screen.queryByDisplayValue('+1')).toBeFalsy();
        expect(screen.queryByDisplayValue('+2')).toBeFalsy();
    });

    it('sets the currentPlus value when select is changed', () => {
        const craftingItems: CraftingItem[] = [{
            ...arbitraryCraftingItem(),
            currentPlus: 1,
            targetPlus: 5,
        }];
        const setCraftingItems = jest.fn();

        const expectedCraftingItems: CraftingItem[] = [{
            ...arbitraryCraftingItem(),
            currentPlus: 4,
            targetPlus: 5,
        }];

        renderSubject({value: [craftingItems, setCraftingItems]});

        const currentPlusSelect = screen.getByRole('combobox', {name: 'currentPlus'});
        fireEvent.change(currentPlusSelect, {target: {value: 4}});

        expect(setCraftingItems).toHaveBeenCalledWith(expectedCraftingItems);
    });

    it('adjusts the targetPlus when the currentPlus is changed and is larger than the targetPlus', () => {
        const craftingItems: CraftingItem[] = [{
            ...arbitraryCraftingItem(),
            currentPlus: 0,
            targetPlus: 2,
        }];
        const setCraftingItems = jest.fn();

        const expectedCraftingItems: CraftingItem[] = [{
            ...arbitraryCraftingItem(),
            currentPlus: 3,
            targetPlus: 3,
        }];

        renderSubject({value: [craftingItems, setCraftingItems]});

        const currentPlusSelect = screen.getByRole('combobox', {name: 'currentPlus'});
        fireEvent.change(currentPlusSelect, {target: {value: 3}});

        expect(setCraftingItems).toHaveBeenCalledWith(expectedCraftingItems);
    });

    it('sets the targetPlus value when select is changed', () => {
        const craftingItems: CraftingItem[] = [{
            ...arbitraryCraftingItem(),
            currentPlus: 1,
            targetPlus: 3,
        }];
        const setCraftingItems = jest.fn();

        const expectedCraftingItems: CraftingItem[] = [{
            ...arbitraryCraftingItem(),
            currentPlus: 1,
            targetPlus: 5,
        }];

        renderSubject({value: [craftingItems, setCraftingItems]});

        const targetPlusSelect = screen.getByRole('combobox', {name: 'targetPlus'});
        fireEvent.change(targetPlusSelect, {target: {value: 5}});

        expect(setCraftingItems).toHaveBeenCalledWith(expectedCraftingItems);
    });

    it('adjusts the currnetPlus when the targetPlus is changed and is smaller than the currentPlus', () => {
        const craftingItems: CraftingItem[] = [{
            ...arbitraryCraftingItem(),
            currentPlus: 3,
            targetPlus: 4,
        }];
        const setCraftingItems = jest.fn();

        const expectedCraftingItems: CraftingItem[] = [{
            ...arbitraryCraftingItem(),
            currentPlus: 2,
            targetPlus: 2,
        }];

        renderSubject({value: [craftingItems, setCraftingItems]});

        const targetPlusSelect = screen.getByRole('combobox', {name: 'targetPlus'});
        fireEvent.change(targetPlusSelect, {target: {value: 2}});

        expect(setCraftingItems).toHaveBeenCalledWith(expectedCraftingItems);
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