import * as React from 'react';
import {FunctionComponent, ChangeEvent} from 'react';
import './IngredientEntry.scss';

interface Props {
    title: string;
    current?: number;
    totalNeeded?: number;
    asset?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const IngredientEntry: FunctionComponent<Props> = (props: Props) => {
    const totalAcquired = props.current >= props.totalNeeded;

    return (
        <div className="IngredientEntry">
            <div className="IngredientEntry-image">
                <img src={props.asset || 'https://via.placeholder.com/35'} />
            </div>
            <div className="IngredientEntry-content">
                <div className="IngredientEntry-title">
                    {props.title}
                </div>
                <div className="IngredientEntry-values">
                    <input
                        className="IngredientEntry-values-current"
                        placeholder={props.title}
                        value={props.current || ''}
                        aria-label={props.title}
                        onChange={props.onChange}
                    />
                    {totalAcquired ?
                        <div className="IngredientEntry-values-status yes">&#x1F5F9;</div>
                        :
                        <div className="IngredientEntry-values-status no">&#x2612;</div>
                    }
                    <div className="IngredientEntry-values-separator">/</div>
                    <div className="IngredientEntry-values-totalNeeded">
                        {props.totalNeeded ?? 0}
                    </div>
                </div>
            </div>
        </div>
    );
};