import React from 'react';
// Estilos
import './styles/fonts.css';
import './styles/normalize.css';
import './styles/main.scss';
// Rutas
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Admin
import LoginAdmin from './screens/admin/LoginAdmin';
import DashAdmin from './screens/admin/DashAdmin';
// 404
import NotFound from './screens/NotFound';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/loginAdmin' element={<LoginAdmin/>}/>
        <Route path='/dashAdmin' element={<DashAdmin/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
