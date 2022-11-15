import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './views/Main';
import NotFound from './views/NotFound';
import ShowOne from './views/ShowOne';

function App() {


  return (
    <>
      <h1>Product Manager</h1>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/product/:id" element={<ShowOne />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
