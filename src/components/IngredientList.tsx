import * as React from 'react';
import {FunctionComponent, PropsWithChildren} from 'react';
import './IngredientList.scss'

interface Props {
    title: string;
    toggle?: () => void;
}

export const IngredientList: FunctionComponent<PropsWithChildren<Props>> = (props: PropsWithChildren<Props>) => {
    return (
        <div className="IngredientList">
            <div 
                className="IngredientList-title"
                onClick={props.toggle}
            >
                {props.title}
            </div>
            {props.children}
        </div>
    )
};