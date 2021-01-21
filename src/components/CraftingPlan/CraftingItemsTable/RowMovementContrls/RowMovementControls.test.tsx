import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {RowMovementControls} from './RowMovementControls';

describe('RowMovementControls', () => {
    it('renders a RowMovementControls', () => {
        renderSubject({});
    });
});

interface OptionalProps {
    move?: boolean;
    isMoving?: boolean;
    onMove?: () => void;
    onMoveUp?: () => void;
    onMoveDown?: () => void;
};

const renderSubject = (props: OptionalProps) => {
    return render(
        <RowMovementControls {...makeProps(props)}/>
    );
};

const makeProps = (props: OptionalProps) => {
    return {
        move: props.move,
        isMoving: props.isMoving,
        onMove: props.onMove || (() => {}),
        onMoveUp: props.onMoveUp || (() => {}),
        onMoveDown: props.onMoveDown || (() => {}),
    };
};