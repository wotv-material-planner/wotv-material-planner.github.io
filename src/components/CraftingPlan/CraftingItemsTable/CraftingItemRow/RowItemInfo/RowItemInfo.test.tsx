import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {RowItemInfo} from './RowItemInfo';

describe('RowItemInfo', () => {
    it('renders a RowItemInfo', () => {
        renderSubject({});
    });
});

interface OptionalProps {
    iname?: string;
    type?: string;
};

const renderSubject = (props: OptionalProps) => {
    return render(
        <RowItemInfo {...makeProps(props)}/>
    );
};

const makeProps = (props: OptionalProps) => {
    return {
        iname: props.iname || 'AF_LW_NKN_001',
        type: props.type || '',
    };
};