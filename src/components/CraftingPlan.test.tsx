import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {CraftingPlan} from './CraftingPlan';

describe('CraftingPlan', () => {
    it('renders a CraftingPlan', () => {
        renderSubject({});

        expect(screen.getByText('Crafting Plan')).toBeTruthy();
    });
});

interface OptionalProps {}

const renderSubject = (props: OptionalProps) => {
    return render(
        <CraftingPlan {...makeProps(props)} />
    );
}

const makeProps = (props: OptionalProps) => {
    return {};
};