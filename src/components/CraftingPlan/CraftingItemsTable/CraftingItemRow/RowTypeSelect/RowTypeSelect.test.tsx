import * as React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {RowTypeSelect} from './RowTypeSelect';
import {TypeOption} from '../../../../../contexts/WotvDumpContext';
import {CraftingItem, UserCraftingItemsContext} from '../../../../../contexts/UserCraftingItemsContext';
import {UserDataProvider} from '../../../../../contexts/UserDataProvider';
import {PersistedState} from '../../../../../hooks/UsePersistedState';
import {arbitraryCraftingItem} from '../../../../../testSupport/arbitraryObjects';

describe('RowTypeSelect', () => {
    it('renders a RowTypeSelect', () => {
        renderSubject({});
    });

    it('renders a type select when types exist', () => {
        const typeOptions = [
            {
                label: 'harder',
                value: 'hrdr',
            },
            {
                label: 'better',
                value: 'bttr',
            }
        ];

        renderSubject({typeOptions});

        const typeSelect = screen.getByRole('combobox', {name: 'typeSelect'});
        expect(typeSelect).toBeTruthy();
    });

    it('does not render a type select when no types are exist', () => {
        renderSubject({});

        const typeSelect = screen.queryByRole('combobox', {name: 'typeSelect'});
        expect(typeSelect).toBeFalsy();
    });

    it('sets the type value when the select is changed', () => {
        const typeOptions = [
            {
                label: 'faster',
                value: 'fstr',
            },
            {
                label: 'stronger',
                value: 'strngr',
            }
        ];

        const craftingItems: CraftingItem[] = [{
            ...arbitraryCraftingItem(),
            targetGrowthType: 'fstr',
        }];

        const setCraftingItems = jest.fn();

        const expectedCraftingItems: CraftingItem[] =[{
            ...arbitraryCraftingItem(),
            targetGrowthType: 'strngr',
        }];

        renderSubject({typeOptions, value: [craftingItems, setCraftingItems]});

        const typeSelect = screen.getByRole('combobox', {name: 'typeSelect'});
        fireEvent.change(typeSelect, {target: {value: 'strngr'}});

        expect(setCraftingItems).toHaveBeenCalledWith(expectedCraftingItems);
    });
});

interface OptionalProps {
    itemIndex?: number;
    typeOptions?: TypeOption[];
    value?: PersistedState<CraftingItem[]>;
};

const renderSubject = (props: OptionalProps) => {
    return render(
        <UserDataProvider>
            <UserCraftingItemsContext.Provider {...makeProps(props)}>
                <RowTypeSelect {...makeProps(props)}/>
            </UserCraftingItemsContext.Provider>
        </UserDataProvider>
    );
};

const makeProps = (props: OptionalProps) => {
    return {
        itemIndex: props.itemIndex ?? 0,
        typeOptions: props.typeOptions || [],
        value: props.value || [[arbitraryCraftingItem()], () => {}],
    };
};