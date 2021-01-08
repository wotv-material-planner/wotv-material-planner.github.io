import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss'
import {App} from './components/App';
import {UserDataProvider} from './contexts/UserDataProvider';
import {WotvDumpProvider} from './contexts/WotvDumpContext';

ReactDOM.render((
    <WotvDumpProvider>
        <UserDataProvider>
            <App />
        </UserDataProvider>
    </WotvDumpProvider>
), document.getElementById('app'));