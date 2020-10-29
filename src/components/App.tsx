import * as React from 'react';
import {FunctionComponent, useContext} from 'react';
import {WotvDumpContext} from '../contexts/WotvDumpContext';
import './App.scss'

export const App: FunctionComponent = () => {
  const dumpContext = useContext(WotvDumpContext);

  console.log(dumpContext);

  return <div className="App">FFBE WOTV MATERIAL PLANNER</div>;
};