import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {MaterialsList} from './MaterialsList';
import {UserMaterialsProvider} from '~/contexts/UserMaterialsContext';
import {defaultContext} from '~/contexts/WotvDumpContext';

describe('MaterialsList', () => {
    it('renders an MaterialsList', () => {
        renderSubject({});
        const {itemMaterials} = defaultContext;

        expect(screen.getAllByRole('textbox')).toHaveLength(itemMaterials.length);
    });
});

interface OptionalProps {};

const renderSubject = (props: OptionalProps) => {
    return render(
        <UserMaterialsProvider>
            <MaterialsList {...makeProps(props)} /> 
        </UserMaterialsProvider>
    );
}

const makeProps = (props: OptionalProps) => {
    return {};
};