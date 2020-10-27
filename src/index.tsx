import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {App} from './components/App';
import {WotvDumpProvider} from './contexts/WotvDumpContext';

ReactDOM.render((
    <WotvDumpProvider>
        <App />
    </WotvDumpProvider>
), document.getElementById('app'));