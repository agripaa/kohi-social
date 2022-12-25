import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { 
  MainPages, 
  ErrorPage,
  Posting
} from './components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPages />} />
        <Route path='/error' element={<ErrorPage />} />
        <Route path='/posting' element={<Posting />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);