import React from 'react';
import { Container } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import UserList from './components/UserList';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Header />
      <Container maxWidth="lg" className="content">
        <UserList />
      </Container>
      <Footer />
    </div>
  );
};

export default App;
