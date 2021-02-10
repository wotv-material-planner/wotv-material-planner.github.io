import * as React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {RowMovementControls} from './RowMovementControls';
import {UserDataProvider} from '~contexts/UserDataProvider';
import {CraftingItem, UserCraftingItemsContext} from '~contexts/UserCraftingItemsContext';
import {PersistedState} from '~hooks/UsePersistedState';
import {arbitraryCraftingItem} from '~testSupport/arbitraryObjects';

describe('RowMovementControls', () => {
    it('renders a RowMovementControls', () => {
        renderSubject({});
    });

    it('displays a move icon when nothing is moving', () => {
        renderSubject({});
        
        expect(screen.getByText('games')).toBeTruthy();
        expect(screen.queryByText('my_location')).toBeFalsy();

        expect(screen.getByText('games').classList.contains('moving')).toBe(false);
    });

    it('displays a target icon when something else is moving', () => {
        renderSubject({moveItemIndex: 1});
        
        expect(screen.getByText('my_location')).toBeTruthy();
        expect(screen.queryByText('games')).toBeFalsy();

        expect(screen.getByText('my_location').classList.contains('moving')).toBe(false);
    });

    it('displays a move icon with an active class when it is moving', () => {
        renderSubject({itemIndex: 0, moveItemIndex: 0});
        
        expect(screen.getByText('games')).toBeTruthy();
        expect(screen.queryByText('my_location')).toBeFalsy();

        expect(screen.getByText('games').classList.contains('moving')).toBe(true);
    });

    it('move an item up when the up arrow is clicked', () => {
        const craftingItems = [
            {
                ...arbitraryCraftingItem(),
                iname: 'slothbear'
            },
            {
                ...arbitraryCraftingItem(),
                iname: 'tiger'
            },
            {
                ...arbitraryCraftingItem(),
                iname: 'ants'
            },
        ];

        const setCraftingItems = jest.fn();

        const expectedCraftingItems = [
            {
                ...arbitraryCraftingItem(),
                iname: 'slothbear'
            },
            {
                ...arbitraryCraftingItem(),
                iname: 'ants'
            },
            {
                ...arbitraryCraftingItem(),
                iname: 'tiger'
            },
        ];

        renderSubject({itemIndex: 2, value: [craftingItems, setCraftingItems]});

        const upArrow = screen.getByText('expand_less');
        fireEvent.click(upArrow);

        expect(setCraftingItems).toHaveBeenCalledWith(expectedCraftingItems);
    });

    it('move an item down when the down arrow is clicked', () => {
        const craftingItems = [
            {
                ...arbitraryCraftingItem(),
                iname: 'slothbear'
            },
            {
                ...arbitraryCraftingItem(),
                iname: 'tiger'
            },
            {
                ...arbitraryCraftingItem(),
                iname: 'ants'
            },
        ];

        const setCraftingItems = jest.fn();

        const expectedCraftingItems = [
            {
                ...arbitraryCraftingItem(),
                iname: 'tiger'
            },
            {
                ...arbitraryCraftingItem(),
                iname: 'slothbear'
            },
            {
                ...arbitraryCraftingItem(),
                iname: 'ants'
            },
        ];

        renderSubject({itemIndex: 0, value: [craftingItems, setCraftingItems]});

        const downArrow = screen.getByText('expand_more');
        fireEvent.click(downArrow);

        expect(setCraftingItems).toHaveBeenCalledWith(expectedCraftingItems);
    });

    it('sets a moveItemIndex when not nothing is moving and the move icon is hit', () => {
        const setMoveItemIndex = jest.fn();
        const setCraftingItems = jest.fn();

        renderSubject({itemIndex: 3, setMoveItemIndex, value: [[], setCraftingItems]});

        const moveIcon = screen.getByText('games');
        fireEvent.click(moveIcon);

        expect(setCraftingItems).not.toHaveBeenCalled();
        expect(setMoveItemIndex).toHaveBeenCalledWith(3);
    });

    it('unsets moveItemIndex when item is moving and the move icon is hit again', () => {
        const setMoveItemIndex = jest.fn();
        const setCraftingItems = jest.fn();

        renderSubject({
            itemIndex: 3,
            moveItemIndex: 3,
            setMoveItemIndex, 
            value: [[], setCraftingItems],
        });

        const moveIcon = screen.getByText('games');
        fireEvent.click(moveIcon);

        expect(setCraftingItems).not.toHaveBeenCalled();
        expect(setMoveItemIndex).toHaveBeenCalledWith(null);
    });

    it('moves an item when the target icon is clicked', () => {
        const craftingItems = [
            {
                ...arbitraryCraftingItem(),
                iname: 'slothbear'
            },
            {
                ...arbitraryCraftingItem(),
                iname: 'tiger'
            },
            {
                ...arbitraryCraftingItem(),
                iname: 'ants'
            },
        ];

        const setMoveItemIndex = jest.fn();
        const setCraftingItems = jest.fn();

        const expectedCraftingItems = [
            {
                ...arbitraryCraftingItem(),
                iname: 'ants'
            },
            {
                ...arbitraryCraftingItem(),
                iname: 'slothbear'
            },
            {
                ...arbitraryCraftingItem(),
                iname: 'tiger'
            },
        ];

        renderSubject({
            itemIndex: 0,
            moveItemIndex: 2,
            setMoveItemIndex, 
            value: [craftingItems, setCraftingItems],
        });

        const targetIcon = screen.getByText('my_location');
        fireEvent.click(targetIcon);

        expect(setCraftingItems).toHaveBeenCalledWith(expectedCraftingItems);
        expect(setMoveItemIndex).toHaveBeenCalledWith(null);
    });
});

interface OptionalProps {
    itemIndex?: number;
    moveItemIndex?: number;
    setMoveItemIndex?: (index: number) => void;
    value?: PersistedState<CraftingItem[]>;
};

const renderSubject = (props: OptionalProps) => {
    return render(
        <UserDataProvider>
            <UserCraftingItemsContext.Provider {...makeProps(props)}>
                <RowMovementControls {...makeProps(props)}/>
            </UserCraftingItemsContext.Provider>
        </UserDataProvider>
    );
};

const makeProps = (props: OptionalProps) => {
    return {
        itemIndex: props.itemIndex ?? 0,
        moveItemIndex: props.moveItemIndex ?? null,
        setMoveItemIndex: props.setMoveItemIndex || (() => {}),
        value: props.value || [[arbitraryCraftingItem()], () => {}],
    };
};