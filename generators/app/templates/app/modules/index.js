import { combineReducers, createStore } from 'redux';
import {routerReducer as routing } from 'react-router-redux';

var requireDir = require('require-directory');
var reducers = requireDir(module, { include: /index.js$/ });

const rootReducer = combineReducers({
  reducers,
  routing
})

export default rootReducer;

export default function configureStore(initialState) {
  if(process.env.NODE_ENV === "production"){
    const store = createStore(
        rootReducer,
        initialState
    );
  }
  else{
    const store = createStore(
        rootReducer,
        initialState,
        DevTools.instrument()
    );
  }

    return store;
}
