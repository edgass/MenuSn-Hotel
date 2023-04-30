import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import store from './store/store';


const persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
          <App />
          </BrowserRouter> 
          </PersistGate>  
      </Provider>
  </React.StrictMode>
);
