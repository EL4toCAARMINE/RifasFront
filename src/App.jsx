import React from 'react';
// Estilos
import './styles/fonts.css';
import './styles/normalize.css';
import './styles/main.scss';
// Rutas
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Cargando iconos
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
// Admin
import LoginAdmin from './screens/admin/LoginAdmin';
import DashAdmin from './screens/admin/DashAdmin';
import CreateRaffle from './screens/admin/CreateRaffle';
import EditRaffle from './screens/admin/EditRaffle';
import AdminRaffle from './screens/admin/AdminRaffle';
// 404
import NotFound from './screens/NotFound';

// Cargando iconos globales
library.add(fas, fab);

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/loginAdmin' element={<LoginAdmin/>}/>
        <Route path='/dashAdmin' element={<DashAdmin/>}/>
        <Route path='/createRaffle' element={<CreateRaffle/>}/>
        <Route path='/editRaffle/:idRaffle' element={<EditRaffle/>}/>
        <Route path='/adminRaffle/:idRaffle' element={<AdminRaffle/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
