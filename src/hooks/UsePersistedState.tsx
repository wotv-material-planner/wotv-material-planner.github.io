import * as React from 'react';
import {useState, useEffect, Dispatch, SetStateAction} from 'react';

export type PersistedState<T> = [T, Dispatch<SetStateAction<T>>];

export function usePersistedState<T>(key: string, init?: T): PersistedState<T> {
    const initialState = Object.assign(init || {}, JSON.parse(localStorage.getItem(key)) || {});

    const [value, setValue] = useState<T>(initialState);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
};