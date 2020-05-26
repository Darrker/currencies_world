import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './js/reducers/index';



ReactDOM.render(
<Provider store={createStore(reducers, applyMiddleware(thunk))}>
    <App />
</Provider>
, document.getElementById('root'));


