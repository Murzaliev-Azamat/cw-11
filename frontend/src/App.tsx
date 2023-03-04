import React from 'react';
import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import AppToolBar from './components/UI/AppToolBar/AppToolBar';
import Register from './features/users/Register';
import Login from './features/users/Login';
import News from './features/news/News';
import FullOneNews from './components/UI/FullOneNews/FullOneNews';
import FormForNews from './features/news/FormForNews';

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm" sx={{mt: 2}} >
        <AppToolBar/>
        <Routes>
          <Route path="/" element={<News/>}/>
          <Route path="/news/:id" element={<FullOneNews/>}/>
          <Route path="/add-one-news" element={<FormForNews/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
