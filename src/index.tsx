import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {App} from './components/App';
import {UserDataProvider} from './contexts/UserDataProvider';
import {WotvDumpProvider} from './contexts/WotvDumpContext';
import './index.scss'

ReactDOM.render((
    <WotvDumpProvider>
        <UserDataProvider>
            <App />
        </UserDataProvider>
    </WotvDumpProvider>
), document.getElementById('app'));