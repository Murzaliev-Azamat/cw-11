import React from 'react';
import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import AppToolBar from './components/UI/AppToolBar/AppToolBar';
import Register from './features/users/Register';
import Login from './features/users/Login';
import Items from './features/items/Items';
import FormForItems from './features/items/FormForItems';

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm" sx={{mt: 2}} >
        <AppToolBar/>
        <Routes>
          <Route path="/" element={<Items/>}/>
          <Route path="/add-item" element={<FormForItems/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
