import React from 'react';
import './App.scss';

import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import { Details } from './components/Details';
import { Home } from './components/Home';
import { NotFound } from './components/NotFound';
import { PageWrapper } from './components/PageWrapper';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageWrapper />}>
          <Route path="/cars">
            <Route path=":id" element={<Details />} />
            <Route index element={<Home />} />
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
  );
}

export default App;
