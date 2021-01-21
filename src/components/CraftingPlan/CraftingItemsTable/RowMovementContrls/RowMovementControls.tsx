import * as React from 'react';
import {FunctionComponent} from 'react';
import './RowMovementControls.scss'

interface Props {
    move?: boolean;
    isMoving?: boolean;
    onMove: () => void;
    onMoveUp: () => void;
    onMoveDown: () => void;
}

export const RowMovementControls: FunctionComponent<Props> = (props: Props) => {
    return (
        <div className="RowMovementControls">
            <i
                className="material-icons RowMovementControls-arrow up"
                onClick={props.onMoveUp}
            >
                expand_less
            </i>
            <i
                className={`material-icons RowMovementControls-move ${props.isMoving && 'moving'}`}
                onClick={props.onMove}
            >
                {props.move ? 'my_location' : 'games'}
            </i>
            <i
                className="material-icons RowMovementControls-arrow down"
                onClick={props.onMoveDown}
            >
                expand_more
            </i>
        </div>
    );
};