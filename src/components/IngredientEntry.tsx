import * as React from 'react';
import {FunctionComponent, ChangeEvent} from 'react';
import './IngredientEntry.scss';

interface Props {
    title: string;
    current?: number;
    totalNeeded?: number;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const IngredientEntry: FunctionComponent<Props> = (props: Props) => {
    return (
        <div
            className="IngredientEntry"
        >
            <div className="IngredientEntry-title">
                {props.title}
            </div>
            <div className="IngredientEntry-values">
                <input
                    className="IngredientEntry-values-current"
                    placeholder={props.title}
                    defaultValue={props.current}
                    onChange={props.onChange}
                />
                <div className="IngredientEntry-values-separator">/</div>
                <div className="IngredientEntry-values-totalNeeded">
                    {props.totalNeeded ?? 0}
                </div>
            </div>
        </div>
    );
};