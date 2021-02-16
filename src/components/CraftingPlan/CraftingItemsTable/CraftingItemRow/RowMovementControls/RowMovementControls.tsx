import * as React from 'react';
import {FunctionComponent, useContext} from 'react';
import {CraftingItem, UserCraftingItemsContext} from '~contexts/UserCraftingItemsContext';
import './RowMovementControls.scss'

interface Props {
    itemIndex: number;
    moveItemIndex?: number;
    setMoveItemIndex: (index: number) => void;
}

const move = (rawArr: CraftingItem[], movingIndex: number, targetIndex: number): CraftingItem[] => {
    const arr = rawArr.slice();

    const movingElement = arr.splice(movingIndex, 1)[0];
    arr.splice(targetIndex, 0, movingElement);

    return arr;
};

export const RowMovementControls: FunctionComponent<Props> = (props: Props) => {
    const [craftingItems, setCraftingItems] = useContext(UserCraftingItemsContext);

    const isMoving = props.itemIndex === props.moveItemIndex;
    const isTargetable = (props.moveItemIndex !== null) && !isMoving;

    return (
        <div className="RowMovementControls">
            <i
                className="material-icons RowMovementControls-arrow up"
                onClick={() => {
                    if ((props.moveItemIndex !== null)) {
                        props.setMoveItemIndex(null);
                    }

                    if (props.itemIndex !== 0) {
                        setCraftingItems(move(craftingItems, props.itemIndex, props.itemIndex - 1));
                    }
                }}
            >
                expand_less
            </i>
            <i
                className={`material-icons RowMovementControls-move ${isMoving && 'moving'}`}
                onClick={() => {
                    if (props.moveItemIndex !== null) {
                        if (props.moveItemIndex !== props.itemIndex) {
                            setCraftingItems(move(craftingItems, props.moveItemIndex, props.itemIndex));
                        }

                        props.setMoveItemIndex(null);
                    } else {
                        props.setMoveItemIndex(props.itemIndex);
                    }
                }}
            >
                {isTargetable ? 'my_location' : 'games'}
            </i>
            <i
                className="material-icons RowMovementControls-arrow down"
                onClick={() => {
                    if (props.moveItemIndex !== null) {
                        props.setMoveItemIndex(null);
                    }

                    if (props.itemIndex !== craftingItems.length - 1) {
                        setCraftingItems(move(craftingItems, props.itemIndex, props.itemIndex + 1));
                    }
                }}
            >
                expand_more
            </i>
        </div>
    );
};