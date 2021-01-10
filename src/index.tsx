import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss'
import {App} from './components/App';
import {UserDataProvider} from './contexts/UserDataProvider';
import {WotvDumpProvider} from './contexts/WotvDumpContext';
import {ListToggleProvider} from './contexts/ListToggleProvider';

ReactDOM.render((
    <WotvDumpProvider>
        <UserDataProvider>
            <ListToggleProvider>
                <App />
            </ListToggleProvider>
        </UserDataProvider>
    </WotvDumpProvider>
), document.getElementById('app'));