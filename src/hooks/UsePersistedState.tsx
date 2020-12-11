import * as React from 'react';
import {useState, useEffect, Dispatch, SetStateAction} from 'react';

export type PersistedState<T> = [T, Dispatch<SetStateAction<T>>];

export function usePersistedState<T>(key: string, init?: T): PersistedState<T> {
    const [value, setValue] = useState<T>(JSON.parse(localStorage.getItem(key)) || init);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
};