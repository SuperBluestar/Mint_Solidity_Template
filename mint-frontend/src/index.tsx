import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import AppRoutes from './AppRoutes';
import reportWebVitals from './reportWebVitals';
import Providers from 'Providers';
import { Buffer } from 'buffer';
import Web3 from 'web3';

window.Buffer = Buffer;

declare global {
  interface Window {
    web3: Web3
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Providers>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
