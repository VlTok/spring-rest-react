import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {store, persistor} from './store/app.store.js'

import {PersistGate} from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';


ReactDOM.render(
  <React.StrictMode>    
    <Provider store={store}>      
      {/* <PersistGate persistor = {persistor}> */}
        <App />      
      {/* </PersistGate>  */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
