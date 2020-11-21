import * as React from 'react';
import {useState, Dispatch, SetStateAction} from 'react';
 
export function usePersistedState<T>(localStorageKey: string): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(JSON.parse(localStorage.getItem(localStorageKey)));
 
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value]);
 
  return [value, setValue];
};