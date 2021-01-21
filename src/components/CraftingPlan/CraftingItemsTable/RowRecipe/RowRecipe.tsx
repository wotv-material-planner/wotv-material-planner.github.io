import * as React from 'react';
import {FunctionComponent, useContext, ChangeEvent} from 'react';
import {CraftingIngredientMap} from '~/contexts/UserCraftingItemsContext'
import {UserRecipeMap, UserRecipesContext} from '~contexts/UserRecipesContext';
import {IngredientEntry} from '~components/common/IngredientEntry';
import './RowRecipe.scss'

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
                    title="Recipes"
                    current={recipes[recipe].current}
                    totalNeeded={props.totalRecipes[recipe]}
                    asset={props.asset}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const newRecipes: UserRecipeMap = {...recipes};

                        if (event.target.value === '') {
                            newRecipes[recipe].current = null;
                        } else {
                            newRecipes[recipe].current = +event.target.value;
                        }

                        setRecipes(newRecipes);
                    }}
                />
            }
        </div>
    );
};