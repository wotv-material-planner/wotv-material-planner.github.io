import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {IngredientList} from './IngredientList';

describe('IngredientList', () => {
    it('renders an IngredientList', () => {
        renderSubject({
            title: 'Slothbear List'
        });

        expect(screen.getByText('Slothbear List')).toBeTruthy();
    });
});

interface OptionalProps {
    title?: string;
    toggle?: () => void
};

const renderSubject = (props: OptionalProps) => {
    return render(
        <IngredientList {...makeProps(props)} />
    );
};

const makeProps = (props: OptionalProps) => {
    return {
        title: props.title || '',
        toggle: props.toggle || (() => {})
    };
};