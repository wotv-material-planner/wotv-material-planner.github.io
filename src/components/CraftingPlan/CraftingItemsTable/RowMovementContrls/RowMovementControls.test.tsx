import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {RowMovementControls} from './RowMovementControls';

describe('RowMovementControls', () => {
    it('renders a RowMovementControls', () => {
        renderSubject({});
    });
});

interface OptionalProps {
    itemIndex?: number;
    moveItemIndex?: number;
    setMoveItemIndex?: (index: number) => void;
};

const renderSubject = (props: OptionalProps) => {
    return render(
        <RowMovementControls {...makeProps(props)}/>
    );
};

const makeProps = (props: OptionalProps) => {
    return {
        itemIndex: props.itemIndex ?? 0,
        moveItemIndex: props.moveItemIndex ?? null,
        setMoveItemIndex: props.setMoveItemIndex || (() => {}),
    };
};