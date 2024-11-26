/* src/App.tsx */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavBar from './component/Navbar/navbarComponent';
import ClienteForm from './component/client/ClienteForm';
import ClienteList from './component/client/ClienteList';
import HospedagemForm from './component/hospedagem/HospedagemForm';
import HospedagemList from './component/hospedagem/HospedagemList';
import Dashboard from './component/dashboard/Dashboard';
import HomePage from './pages/homePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../src/component/css/app.module.css"

function App() {
  return (
    <Router>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/clientes/novo" element={<ClienteForm />} />
          <Route path="/clientes" element={<ClienteList />} />
          <Route path="/hospedagens/novo" element={<HospedagemForm />} />
          <Route path="/hospedagens" element={<HospedagemList />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;