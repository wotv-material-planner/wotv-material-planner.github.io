import * as React from 'react';
import {ReactNode} from 'react';
import {render, screen} from '@testing-library/react';
import {Popover} from './Popover';

describe('Popover', () => {
    it('renders an Popover', () => {
        renderSubject({});
    });
});

interface OptionalProps {
    content?: ReactNode;
    timeout?: number;
};

const renderSubject = (props: OptionalProps) => {
    return render(
        <Popover {...makeProps(props)} />
    );
};

const makeProps = (props: OptionalProps) => {
    return {
        content: props.content || <div />,
        timeout: props.timeout || 0,
    };
};