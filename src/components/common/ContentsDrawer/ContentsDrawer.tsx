import * as React from 'react';
import {FunctionComponent, PropsWithChildren, useState} from 'react';
import './ContentsDrawer.scss'

interface Props {
    title: string;
    fixed?: boolean;
}

export const ContentsDrawer: FunctionComponent<PropsWithChildren<Props>> = (props: PropsWithChildren<Props>) => {
    const [open, setOpen] = useState<boolean>(!!props.fixed);
    const [active, setActive] = useState<boolean>(false);

    return (
        <div
            className={`ContentsDrawer ${open ? 'open' : 'closed'} ${props.fixed ? 'fixed' : ''} ${active ? 'active' : ''}`}
            onMouseEnter={() => {
                setActive(true);
            }}
            onMouseLeave={() => {
                setActive(false);
            }}
        >
            <div 
                className="ContentsDrawer-title"
                onClick={() => {
                    if (!props.fixed) {
                        setOpen(!open);
                    }
                }}
            >
                {props.title}
            </div>
            <div className="ContentsDrawer-contents">
                {open && 
                    props.children
                }
            </div>
        </div>
    )
};