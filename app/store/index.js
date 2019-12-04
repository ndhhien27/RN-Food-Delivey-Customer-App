/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { createStore, applyMiddleware, compose } from 'redux';
import Reactotron from 'reactotron-react-native';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';
import reactotron from '../../ReactotronConfig';

const sagaMonitor = Reactotron.createSagaMonitor();

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

// const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    reactotron.createEnhancer()
  )
);
sagaMiddleware.run(rootSaga);

export default store;
