import React, {Component} from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import createLogger from 'redux-logger';
import {reduxObservable} from 'redux-observable';
import rootReducers from '../../reducers';
import User from './user';

// Single store
const rxMiddleware = reduxObservable();
const loggerMiddleware = createLogger({duration: true});
const store = createStore(rootReducers, applyMiddleware(rxMiddleware, loggerMiddleware));

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <User />
      </Provider>
    );
  }
}