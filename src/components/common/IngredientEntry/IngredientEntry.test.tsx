import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {IngredientEntry} from './IngredientEntry';
import {UserIngredientValues} from '../../../contexts/UserDataProvider';
import {arbitraryUserIngredientValues} from '../../../testSupport/arbitraryObjects';

describe('IngredientEntry', () => {
    it('renders an IngredientEntry', () => {
        renderSubject({
            title: 'Slothbear'
        });

        expect(screen.getByText('Slothbear')).toBeTruthy();
    });
});

interface OptionalProps {
    ingredient?: string;
    ingredientTotals?: UserIngredientValues; 
    title?: string;
    totalNeeded?: number;
    asset?: string;
    onChange?: () => void;
};

const renderSubject = (props: OptionalProps) => {
    return render(
        <IngredientEntry {...makeProps(props)} />
    );
};

const makeProps = (props: OptionalProps) => {
    return {
        ingredient: props.ingredient || '',
        ingredientTotals: props.ingredientTotals || arbitraryUserIngredientValues(),
        title: props.title || '',
        totalNeeded: props.totalNeeded,
        asset: props.asset,
        onChange: props.onChange || (() => {})
    };
};