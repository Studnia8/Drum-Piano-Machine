import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MyDrumApp from './MyDM';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<MyDrumApp />, document.getElementById('root'));

serviceWorker.unregister();
