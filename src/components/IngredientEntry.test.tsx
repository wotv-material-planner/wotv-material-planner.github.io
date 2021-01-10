import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {IngredientEntry} from './IngredientEntry';

describe('IngredientEntry', () => {
    it('renders an IngredientEntry', () => {
        renderSubject({
            title: 'Slothbear'
        });

        expect(screen.getByText('Slothbear')).toBeTruthy();
    });
});

interface OptionalProps {
    title?: string;
    current?: number;
    totalNeeded?: number;
    onChange?: () => void;
};

const renderSubject = (props: OptionalProps) => {
    return render(
        <IngredientEntry {...makeProps(props)} />
    );
};

const makeProps = (props: OptionalProps) => {
    return {
        title: props.title || '',
        current: props.current,
        totalNeeded: props.totalNeeded,
        onChange: props.onChange || (() => {})
    };
};