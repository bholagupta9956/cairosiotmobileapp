// This is the store of the project ;
import rootReducer from './reducers/index';
import {createStore} from 'redux';
import {applyMiddleware, thunkMiddleware} from 'redux';
import {createStoreHook} from 'react-redux';

const store = () => {
  return createStore(rootReducer);
};

export default store;
