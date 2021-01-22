import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {RowTypeSelect} from './RowTypeSelect';
import {TypeOption} from '~contexts/WotvDumpContext';

describe('RowTypeSelect', () => {
    it('renders a RowTypeSelect', () => {
        renderSubject({});
    });
});

interface OptionalProps {
    itemIndex?: number;
    typeOptions?: TypeOption[];
};

const renderSubject = (props: OptionalProps) => {
    return render(
        <RowTypeSelect {...makeProps(props)}/>
    );
};

const makeProps = (props: OptionalProps) => {
    return {
        itemIndex: props.itemIndex ?? 0,
        typeOptions: props.typeOptions || [],
    };
};