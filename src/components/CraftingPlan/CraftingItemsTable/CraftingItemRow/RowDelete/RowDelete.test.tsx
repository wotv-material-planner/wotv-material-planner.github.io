import * as React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {RowDelete} from './RowDelete';
import {UserBooksContext} from '../../../../../contexts/UserBooksContext';
import {UserRecipesContext} from '../../../../../contexts/UserRecipesContext';
import {UserMaterialsContext} from '../../../../../contexts/UserMaterialsContext';
import {CraftingItem, TotalCraftingIngredients, UserCraftingItemsContext} from '../../../../../contexts/UserCraftingItemsContext';
import {PersistedState} from '../../../../../hooks/UsePersistedState';
import {arbitraryCraftingItem, arbitraryTotalCraftingIngredients} from '../../../../../testSupport/arbitraryObjects';
import {UserIngredientMap} from '../../../../../contexts/UserDataProvider';

describe('RowDelete', () => {
    it('renders a RowDelete', () => {
        renderSubject({});
    });

    it('deletes a crafting item on row delete', () => {
        const craftingItems: CraftingItem[] = [
            {
                ...arbitraryCraftingItem(),
                iname: 'this one'
            },
            {
                ...arbitraryCraftingItem(),
                iname: 'that one'
            },
        ];
        const setCraftingItems = jest.fn();

        const expectedCraftingItems: CraftingItem[] = [
            {
                ...arbitraryCraftingItem(),
                iname: 'that one'
            },
        ];

        renderSubject({craftingItemsValue: [craftingItems, setCraftingItems]});

        const deleteIcon = screen.getByText('delete_forever');
        fireEvent.click(deleteIcon);

        expect(setCraftingItems).toHaveBeenCalledWith(expectedCraftingItems);
    });

    it('updates recipes on row delete', () => {
        const recipes: UserIngredientMap = {
            slothbear_sword_recipe: {
                current: 4000,
                totalNeeded: 5000,
            },
        };

        const setRecipes = jest.fn();

        const expectedRecipes = {
            slothbear_sword_recipe: {
                current: 4000,
                totalNeeded: 4500,
            }
        }

        const totalIngredients = {
            ...arbitraryTotalCraftingIngredients(),
            recipes: {
                slothbear_sword_recipe: 500,
            }
        };

        renderSubject({
            totalIngredients,
            recipesValue: [recipes, setRecipes]
        });

        const deleteIcon = screen.getByText('delete_forever');
        fireEvent.click(deleteIcon);

        expect(setRecipes).toHaveBeenCalledWith(expectedRecipes);
    });

    it('updates books on row delete', () => {
        const books: UserIngredientMap = {
            bear_books: {
                current: 1,
                totalNeeded: 3,
            },
        };

        const setBooks = jest.fn();

        const expectedBooks = {
            bear_books: {
                current: 1,
                totalNeeded: 2,
            }
        }

        const totalIngredients = {
            ...arbitraryTotalCraftingIngredients(),
            books: {
                bear_books: 1,
            }
        };

        renderSubject({
            totalIngredients,
            booksValue: [books, setBooks]
        });

        const deleteIcon = screen.getByText('delete_forever');
        fireEvent.click(deleteIcon);

        expect(setBooks).toHaveBeenCalledWith(expectedBooks);
    });

    it('updates materials on row delete', () => {
        const materials: UserIngredientMap = {
            ants: {
                current: 100,
                totalNeeded: 300,
            },
            vacuums: {
                current: 500,
                totalNeeded: 1000,
            },
        };

        const setMaterials = jest.fn();

        const expectedMaterials = {
            ants: {
                current: 100,
                totalNeeded: 200,
            },
            vacuums: {
                current: 500,
                totalNeeded: 0,
            },
        }

        const totalIngredients = {
            ...arbitraryTotalCraftingIngredients(),
            materials: {
                ants: 100,
                vacuums: 1000,
            }
        };

        renderSubject({
            totalIngredients,
            materialsValue: [materials, setMaterials]
        });

        const deleteIcon = screen.getByText('delete_forever');
        fireEvent.click(deleteIcon);

        expect(setMaterials).toHaveBeenCalledWith(expectedMaterials);
    });
});

interface OptionalProps {
    itemIndex?: number;
    totalIngredients?: TotalCraftingIngredients;
    booksValue?: PersistedState<UserIngredientMap>;
    recipesValue?: PersistedState<UserIngredientMap>;
    materialsValue?: PersistedState<UserIngredientMap>;
    craftingItemsValue?: PersistedState<CraftingItem[]>;
};

const renderSubject = (props: OptionalProps) => {
    const allProps = makeProps(props);

    return render(
        <UserBooksContext.Provider value={allProps.booksValue}>
            <UserRecipesContext.Provider value={allProps.recipesValue}>
                <UserMaterialsContext.Provider value={allProps.materialsValue}>
                    <UserCraftingItemsContext.Provider value={allProps.craftingItemsValue}>
                        <RowDelete {...allProps}/>
                    </UserCraftingItemsContext.Provider>
                </UserMaterialsContext.Provider>
            </UserRecipesContext.Provider>
        </UserBooksContext.Provider>
    );
};

const makeProps = (props: OptionalProps) => {
    return {
        itemIndex: props.itemIndex ?? 0,
        totalIngredients: props.totalIngredients || arbitraryTotalCraftingIngredients(),
        booksValue: props.booksValue || [{}, () => {}],
        recipesValue: props.recipesValue || [{}, () => {}],
        materialsValue: props.materialsValue || [{}, () => {}],
        craftingItemsValue: props.craftingItemsValue || [[arbitraryCraftingItem()], () => {}],
    };
};