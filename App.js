/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';

import rootReducer from './redusers';
import watcherSaga from './sagas';

import StreamActionPanel from './components/StreamActionPanel';
import { Routes } from './navigation/Route';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// dev tools middleware
const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// create a redux store with our reducer above and middleware
let store = createStore(
  rootReducer,
  reduxDevTools ? compose(applyMiddleware(sagaMiddleware), reduxDevTools) : applyMiddleware(sagaMiddleware),
);

// run the saga
sagaMiddleware.run(watcherSaga);

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      {/*<View style={styles.container}>*/}
      {/*  <ScrollView*/}
      {/*    contentInsetAdjustmentBehavior="automatic"*/}
      {/*    style={styles.contentContainer}>*/}
      {/*  </ScrollView>*/}
      {/*  <StreamActionPanel />*/}
      {/*</View>*/}
      <Routes />
    </Provider>
  );
};

export default App;
