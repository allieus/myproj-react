import './index.css';

import App from './App';
import { AuthProvider } from 'contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from 'ErrorBoundary';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
);
