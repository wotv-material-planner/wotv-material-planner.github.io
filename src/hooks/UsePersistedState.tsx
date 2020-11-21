import * as React from 'react';
import {useState, Dispatch, SetStateAction} from 'react';
 
export function usePersistedState<T>(key: string, init?: T): [T, Dispatch<SetStateAction<T>>] {
    const [value, setValue] = useState<T>(JSON.parse(localStorage.getItem(key)) || init);

    React.useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
};