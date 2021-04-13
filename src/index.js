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


import {createStore ,applyMiddleware  , compose , combineReducers} from 'redux';
import thunk from 'redux-thunk';
import displayReducer from './store/reducers/displayReducer';
import authReducer from './store/reducers/authReducer';

const rootReducer = combineReducers({
  displayReducer:displayReducer,
  authReducer:authReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
  ));
  
  React.icons = icons;

const app = (
  <Provider store={store}>
  <I18nextProvider i18n={i18n} >
  <App />
    </I18nextProvider>
  </Provider>
);

ReactDOM.render( app ,document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
