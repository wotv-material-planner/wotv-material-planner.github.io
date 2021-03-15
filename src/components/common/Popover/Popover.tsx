import * as React from 'react';
import {FunctionComponent, useState, ReactNode} from 'react';
import './Popover.scss'

interface Props {
    content: ReactNode;
    timeout?: number;
}

export const Popover: FunctionComponent<Props> = (props) => {
    const [isPopped, setIsPopped] = useState<boolean>(false);
    const [timeoutHandler, setTimeoutHandler] = useState<NodeJS.Timeout>();

    return (
        <div
            className="Popover"
            onMouseEnter={() => {
                const handler = setTimeout(() => {
                    setIsPopped(true);
                }, props.timeout || 1000);

                setTimeoutHandler(handler);
            }}
            onMouseLeave={() => {
                setIsPopped(false);
                clearTimeout(timeoutHandler);
                setTimeoutHandler(null);
            }}
        >
            {props.children}
            {isPopped && 
                <div className="Popover-content">
                    {props.content}
                </div>
            }
        </div>
    );
};