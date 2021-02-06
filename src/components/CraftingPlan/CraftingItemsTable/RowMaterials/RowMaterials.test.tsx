import * as React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {RowMaterials} from './RowMaterials';
import {CraftingIngredientMap} from '~contexts/UserCraftingItemsContext';
import {PersistedState} from '~hooks/UsePersistedState';
import {UserMaterialMap, UserMaterialsContext} from '~contexts/UserMaterialsContext';
import {WotvDumpProvider} from '~contexts/WotvDumpContext';

describe('RowMaterials', () => {
    it('renders a RowMaterials', () => {
        renderSubject({});
    });

    it('renders a material ingredient entry when a material exists', () => {
        const materials: UserMaterialMap = {
            IT_AF_MAT_BONE: {
                current: 300,
                totalNeeded: 400,
            }
        };

        const totalMaterials = {
            IT_AF_MAT_BONE: 5,
        };

        renderSubject({totalMaterials, value: [materials, null]});

        const materialInput = screen.getByRole('textbox', {name: 'Bone Chip'});

        expect(screen.getByText('Bone Chip')).toBeTruthy();
        expect(materialInput.getAttribute('value')).toEqual('300');
    });

    it('renders multiple material ingredient entry when multiple materials exist', () => {
        const materials: UserMaterialMap = {
            IT_AF_MAT_BONE: {
                current: 300,
                totalNeeded: 400,
            },
            IT_AF_MAT_ARMN: {
                current: 30,
                totalNeeded: 100,
            },
        };

        const totalMaterials = {
            IT_AF_MAT_BONE: 5,
            IT_AF_MAT_ARMN: 10,
        };

        renderSubject({totalMaterials, value: [materials, null]});

        const materialInput = screen.getAllByRole('textbox');

        expect(materialInput.length).toEqual(2);
    });

    it('does not render recipe ingredient entry when a recipe does not exist', () => {
        const totalMaterials = {};

        renderSubject({totalMaterials});

        const materialInput = screen.queryAllByRole('textbox');

        expect(materialInput.length).toEqual(0);
    });

    it('sets a recipe current value on change', () => {
        const materials: UserMaterialMap = {
            IT_AF_MAT_BONE: {
                current: 300,
                totalNeeded: 400,
            }
        };

        const setMaterials = jest.fn();

        const totalMaterials = {
            IT_AF_MAT_BONE: 5,
        };

        const expectedMaterials: UserMaterialMap = {
            IT_AF_MAT_BONE: {
                current: 350,
                totalNeeded: 400,
            }
        };

        renderSubject({totalMaterials, value: [materials, setMaterials]});

        const materialInput = screen.getByRole('textbox', {name: 'Bone Chip'});
        fireEvent.change(materialInput, {target: {value: 350}});

        expect(setMaterials).toHaveBeenCalledWith(expectedMaterials);
    });

    it('sets a material current value to null on empty input', () => {
        const materials: UserMaterialMap = {
            IT_AF_MAT_BONE: {
                current: 300,
                totalNeeded: 400,
            }
        };

        const setMaterials = jest.fn();

        const totalMaterials = {
            IT_AF_MAT_BONE: 5,
        };

        const expectedMaterials: UserMaterialMap = {
            IT_AF_MAT_BONE: {
                current: null,
                totalNeeded: 400,
            }
        };

        renderSubject({totalMaterials, value: [materials, setMaterials]});

        const materialInput = screen.getByRole('textbox', {name: 'Bone Chip'});
        fireEvent.change(materialInput, {target: {value: ''}});

        expect(setMaterials).toHaveBeenCalledWith(expectedMaterials);
    });

    it('sets a recipe current value to null on invalid number input', () => {
        const materials: UserMaterialMap = {
            IT_AF_MAT_BONE: {
                current: 300,
                totalNeeded: 400,
            }
        };

        const setMaterials = jest.fn();

        const totalMaterials = {
            IT_AF_MAT_BONE: 5,
        };

        const expectedMaterials: UserMaterialMap = {
            IT_AF_MAT_BONE: {
                current: null,
                totalNeeded: 400,
            }
        };

        renderSubject({totalMaterials, value: [materials, setMaterials]});

        const materialInput = screen.getByRole('textbox', {name: 'Bone Chip'});
        fireEvent.change(materialInput, {target: {value: 'Mr Bones Wild Ride'}});

        expect(setMaterials).toHaveBeenCalledWith(expectedMaterials);
    });
});

interface OptionalProps {
    totalMaterials?: CraftingIngredientMap;
    value?: PersistedState<UserMaterialMap>;
};

const renderSubject = (props: OptionalProps) => {
    return render(
        <WotvDumpProvider>
            <UserMaterialsContext.Provider {...makeProps(props)}>
                <RowMaterials {...makeProps(props)}/>
            </UserMaterialsContext.Provider>
        </WotvDumpProvider>
    );
};

const makeProps = (props: OptionalProps) => {
    return {
        totalMaterials: props.totalMaterials || {},
        value: props.value || [{}, null],
    };
};