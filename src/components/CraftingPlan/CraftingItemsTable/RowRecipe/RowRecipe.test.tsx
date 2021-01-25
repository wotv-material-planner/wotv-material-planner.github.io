import * as React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {RowRecipe} from './RowRecipe';
import {CraftingIngredientMap} from '~contexts/UserCraftingItemsContext';
import {UserRecipesContext, UserRecipeMap} from '~contexts/UserRecipesContext';
import {PersistedState} from '~hooks/UsePersistedState';

describe('RowRecipe', () => {
    it('renders a RowRecipe', () => {
        renderSubject({});
    });

    it('renders an recipe ingredient entry when a recipe exists', () => {
        const recipes: UserRecipeMap = {
            slothbear_sword: {
                current: 200,
                totalNeeded: 500,
            }
        };

        const totalRecipes = {
            slothbear_sword: 5,
        };

        renderSubject({totalRecipes, value: [recipes, null]});

        const recipeInput = screen.getByRole('textbox', {name: 'Recipes'});

        expect(screen.getByText('Recipes')).toBeTruthy();
        expect(recipeInput.getAttribute('value')).toEqual('200');
    });

    it('does not render recipe ingredient entry when a recipe does not exist', () => {
        const totalRecipes = {};

        renderSubject({totalRecipes});

        expect(screen.queryByText('Recipes')).toBeFalsy();
    });

    it('sets a recipe current value on change', () => {
        const recipes: UserRecipeMap = {
            slothbear_sword: {
                current: 200,
                totalNeeded: 500,
            }
        };
        const setRecipes = jest.fn();

        const expectedRecipes: UserRecipeMap = {
            slothbear_sword: {
                current: 9001,
                totalNeeded: 500,
            }
        }

        const totalRecipes = {
            slothbear_sword: 5,
        };

        renderSubject({totalRecipes, value: [recipes, setRecipes]});

        const recipeInput = screen.getByRole('textbox', {name: 'Recipes'});
        fireEvent.change(recipeInput, {target: {value: 9001}});

        expect(setRecipes).toHaveBeenCalledWith(expectedRecipes);
    });

    it('sets a recipe current value to null on empty input', () => {
        const recipes: UserRecipeMap = {
            slothbear_sword: {
                current: 200,
                totalNeeded: 500,
            }
        };
        const setRecipes = jest.fn();

        const expectedRecipes: UserRecipeMap = {
            slothbear_sword: {
                current: null,
                totalNeeded: 500,
            }
        }

        const totalRecipes = {
            slothbear_sword: 5,
        };

        renderSubject({totalRecipes, value: [recipes, setRecipes]});

        const recipeInput = screen.getByRole('textbox', {name: 'Recipes'});
        fireEvent.change(recipeInput, {target: {value: ''}});

        expect(setRecipes).toHaveBeenCalledWith(expectedRecipes);
    });

    it('sets a recipe current value to null on invalid number input', () => {
        const recipes: UserRecipeMap = {
            slothbear_sword: {
                current: 200,
                totalNeeded: 500,
            }
        };
        const setRecipes = jest.fn();

        const expectedRecipes: UserRecipeMap = {
            slothbear_sword: {
                current: null,
                totalNeeded: 500,
            }
        }

        const totalRecipes = {
            slothbear_sword: 5,
        };

        renderSubject({totalRecipes, value: [recipes, setRecipes]});

        const recipeInput = screen.getByRole('textbox', {name: 'Recipes'});
        fireEvent.change(recipeInput, {target: {value: 'Delicious Ants'}});

        expect(setRecipes).toHaveBeenCalledWith(expectedRecipes);
    });
});

interface OptionalProps {
    totalRecipes?: CraftingIngredientMap;
    asset?: string;
    value?: PersistedState<UserRecipeMap>;
};

const renderSubject = (props: OptionalProps) => {
    return render(
        <UserRecipesContext.Provider {...makeProps(props)}>
            <RowRecipe {...makeProps(props)}/>
        </UserRecipesContext.Provider>
    );
};

const makeProps = (props: OptionalProps) => {
    return {
        totalRecipes: props.totalRecipes || {},
        asset: props.asset || '',
        value: props.value || [{}, null],
    };
};