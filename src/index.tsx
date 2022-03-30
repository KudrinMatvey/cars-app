import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Details } from './components/Details';
import { List } from './components/List';
import { NotFound } from './components/NotFound';

// to app, app to page wrapper
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/cars">
            <Route path=":id" element={<Details />} />
            <Route index element={<List />} />
          </Route>
          <Route
            path="/"
            element={<Navigate to="/cars" replace />}
          />
          <Route path="/not-found" element={<NotFound />} />
          <Route
            path="*"
            element={<Navigate to="/not-found" replace />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
