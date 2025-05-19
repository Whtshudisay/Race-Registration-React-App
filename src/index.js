import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // <-- add this
import App from './App';
import ThankYou from './ThankYou';
import './index.js'; 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/thankyou" element={<ThankYou />} />
    </Routes>
  </BrowserRouter>
);
