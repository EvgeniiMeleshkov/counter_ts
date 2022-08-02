import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {loadState, saveState} from './localStorage';
import {createStore} from 'redux';
import {rootReducer} from './Redux/store';
import {throttle} from 'lodash';

const persistedState = loadState()
const store = createStore(
    rootReducer,
    persistedState
)
store.subscribe(throttle(() => {
    saveState({
        settings: store.getState().settings,
        edition: store.getState().edition
    });
}, 1000));
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
