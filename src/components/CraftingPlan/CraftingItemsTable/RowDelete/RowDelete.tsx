import * as React from 'react';
import {FunctionComponent, useContext} from 'react';
import {UserBooksContext} from '~contexts/UserBooksContext';
import {CraftingItem, TotalCraftingIngredients, UserCraftingItemsContext} from '~contexts/UserCraftingItemsContext';
import {UserMaterialsContext} from '~contexts/UserMaterialsContext';
import {UserRecipesContext} from '~contexts/UserRecipesContext';
import './RowDelete.scss'

interface Props {
    itemIndex: number;
    totalIngredients: TotalCraftingIngredients;
}

export const RowDelete: FunctionComponent<Props> = (props) => {
    const [craftingItems, setCraftingItems] = useContext(UserCraftingItemsContext);
    const [recipes, setRecipes] = useContext(UserRecipesContext);
    const [books, setBooks] = useContext(UserBooksContext);
    const [materials, setMaterials] = useContext(UserMaterialsContext);

    const recipe = Object.keys(props.totalIngredients.recipes)[0];
    const book = Object.keys(props.totalIngredients.books)[0];
    const craftingMaterials = Object.keys(props.totalIngredients.materials);

    return (
        <div 
            className="RowDelete"
            onClick={() => {
                const newCraftingItems: CraftingItem[] = [...craftingItems];
                newCraftingItems.splice(props.itemIndex, 1);

                const newBooks = {...books};
                const newRecipes = {...recipes};
                const newMaterials = {...materials};

                if (book) {
                    newBooks[book].totalNeeded -= props.totalIngredients.books[book];
                }

                setBooks(newBooks);

                if (recipe) {
                    newRecipes[recipe].totalNeeded -= props.totalIngredients.recipes[recipe];
                }

                setRecipes(newRecipes);

                craftingMaterials.forEach((material) => {
                    newMaterials[material].totalNeeded -= props.totalIngredients.materials[material];
                });

                setMaterials(newMaterials);

                setCraftingItems(newCraftingItems);
            }}
        >
            <i className="material-icons">delete_forever</i>
        </div>
    )
};