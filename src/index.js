import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import { store, persistor } from 'src/redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import App from './App';

ReactDOM.render((
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
