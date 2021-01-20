import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {CraftingPlan} from './CraftingPlan';
import {UserDataProvider} from '~/contexts/UserDataProvider';

describe('CraftingPlan', () => {
    it('renders a CraftingPlan', () => {
        renderSubject({});

        expect(screen.getByText('Add Items')).toBeTruthy();
    });
});

interface OptionalProps {};

const renderSubject = (props: OptionalProps) => {
    return render(
        <UserDataProvider>
            <CraftingPlan {...makeProps(props)} />
        </UserDataProvider>
    );
};

const makeProps = (props: OptionalProps) => {
    return {};
};