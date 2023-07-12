import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './state/store.js';


/**
 * Renderiza la aplicación en el elemento raíz del DOM.
 * @function
 * @name renderApp
 */

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Provider store={store}>
        <App />
    </Provider>
    </BrowserRouter>
)
