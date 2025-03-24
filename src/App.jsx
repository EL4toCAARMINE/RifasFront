import React, { useEffect } from 'react';
// Estilos
import './styles/fonts.css';
import './styles/normalize.css';
import './styles/main.scss';
// Rutas
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
// User
import SearchRaffle from './screens/users/searchRaffle';
import RaffleInstructions from './screens/users/RaffleInstructions';
import SearchTicket from './screens/users/SearchTicket';
import BuyTicket from './screens/users/BuyTicket';
// 404
import NotFound from './screens/NotFound';
// Importantes para hacer uso del store
import { useDispatch, useSelector } from 'react-redux';
//action login del store
import { verifySession } from './features/AuthSlice';

// Cargando iconos globales
library.add(fas, fab);

function App() {

  //Permite acceder a los actions del store
  const dispatch = useDispatch();

  // lllamamos al action
  const verifyS = (data) => {
    dispatch(verifySession(data));
  };

  useEffect(()=>{
    verifyS()
  },[]);

  // obtenemos el estado
  const auth = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/loginAdmin' element={auth.session ? <Navigate to="/dashAdmin"/> : <LoginAdmin />} />
        <Route path='/dashAdmin' element={auth.session ? <DashAdmin/> : <Navigate to="/loginAdmin"/>} />
        <Route path='/createRaffle' element={<CreateRaffle />} />
        <Route path='/editRaffle/:idRaffle' element={<EditRaffle />} />
        <Route path='/adminRaffle/:idRaffle' element={<AdminRaffle />} />

        <Route path='/raffleInstructions/:idRaffle' element={<RaffleInstructions />} />
        <Route path='/searchTicket/:idRaffle' element={<SearchTicket />} />
        <Route path='/buyTicket/:idRaffle' element={<BuyTicket />} />
        <Route path='/' element={<SearchRaffle />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
