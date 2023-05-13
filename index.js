/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import store from './src/store';
import React from "react";

const stores = store();

const RNRedux = () => (
    <Provider store = { stores }>
      <App />
    </Provider>
  )
  
  AppRegistry.registerComponent(appName, () => RNRedux);