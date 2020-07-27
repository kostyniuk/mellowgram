import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/rootReducer';

import './index.css';
import App from './App';

let store;

if(process.env.NODE_ENV === 'production') {
  store = createStore(rootReducer, compose(
    applyMiddleware(thunk),

  ));
} else {
  store = createStore(rootReducer, compose(
    applyMiddleware(thunk),

      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ));
}

const app = (
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
