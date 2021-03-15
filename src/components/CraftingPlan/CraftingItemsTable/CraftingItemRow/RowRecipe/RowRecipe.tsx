import * as React from 'react';
import {FunctionComponent, useContext, ChangeEvent} from 'react';
import {CraftingIngredientMap} from '~/contexts/UserCraftingItemsContext'
import {UserRecipesContext} from '~contexts/UserRecipesContext';
import {IngredientEntry} from '~components/common/IngredientEntry';
import './RowRecipe.scss'
import {UserIngredientMap} from '~contexts/UserDataProvider';

interface Props {
    totalRecipes: CraftingIngredientMap;
    asset: string;
}

export const RowRecipe: FunctionComponent<Props> = (props: Props) => {
    const [recipes, setRecipes] = useContext(UserRecipesContext);
    const recipe = Object.keys(props.totalRecipes)[0];

    return (
        <div className="RowRecipe">
            {recipe &&
                <IngredientEntry
                    ingredient={recipe}
                    ingredientTotals={recipes[recipe]}
                    title="Recipes"
                    totalNeeded={props.totalRecipes[recipe]}
                    asset={props.asset}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const newRecipes: UserIngredientMap = {...recipes};
                        const newCurrentValue = +event.target.value;

                        if (Number.isNaN(newCurrentValue) || event.target.value === '') {
                            newRecipes[recipe].current = null;
                        } else {
                            newRecipes[recipe].current = newCurrentValue;
                        }

                        setRecipes(newRecipes);
                    }}
                />
            }
        </div>
    );
};