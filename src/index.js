import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import 'core-js';
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import App from './App';
import * as serviceWorker from './serviceWorker';

import { icons } from './assets/icons';
import { Provider } from 'react-redux';
// import store from './store';

import {createStore ,applyMiddleware  , compose} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './store/reducers/userReducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(userReducer, composeEnhancers(
  applyMiddleware(thunk)
  ));
  
  React.icons = icons;

const app = (
  <I18nextProvider i18n={i18n} >
  <Provider store={store}>
  <App />
  </Provider>
    </I18nextProvider>
);

ReactDOM.render( app ,document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
