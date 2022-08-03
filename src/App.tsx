import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';


const App = () => {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} /> 
      <Route path="*" element={<NotFoundPage />} /> 
    </Routes>
    </BrowserRouter>
  )
}

export default App;

