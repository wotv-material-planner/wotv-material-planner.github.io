import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss'
import {App} from './components/App';
import {UserDataProvider} from './contexts/UserDataProvider';
import {WotvDumpProvider} from './contexts/WotvDumpContext';
import {ToggleProvider} from './contexts/ToggleProvider';

ReactDOM.render((
    <WotvDumpProvider>
        <UserDataProvider>
            <ToggleProvider>
                <App />
            </ToggleProvider>
        </UserDataProvider>
    </WotvDumpProvider>
), document.getElementById('app'));