import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const ClienteForm = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
    clientes.push({ id: Date.now(), nome, email, telefone });
    localStorage.setItem('clientes', JSON.stringify(clientes));
    setNome('');
    setEmail('');
    setTelefone('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formNome">
        <Form.Label>Nome</Form.Label>
        <Form.Control type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" required />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      </Form.Group>
      <Form.Group controlId="formTelefone">
        <Form.Label>Telefone</Form.Label>
        <Form.Control type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="Telefone" required />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">
        Cadastrar Cliente
      </Button>
    </Form>
  );
};

export default ClienteForm;