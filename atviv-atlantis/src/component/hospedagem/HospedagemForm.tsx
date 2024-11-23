import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const HospedagemForm = () => {
  const [tipo, setTipo] = useState('');
  const [status, setStatus] = useState('');
  const [cliente, setCliente] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hospedagens = JSON.parse(localStorage.getItem('hospedagens') || '[]');
    hospedagens.push({ id: Date.now(), tipo, status, cliente });
    localStorage.setItem('hospedagens', JSON.stringify(hospedagens));
    setTipo('');
    setStatus('');
    setCliente('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formTipo">
        <Form.Label>Tipo</Form.Label>
        <Form.Control type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} placeholder="Tipo" required />
      </Form.Group>
      <Form.Group controlId="formStatus">
        <Form.Label>Status</Form.Label>
        <Form.Control type="text" value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Status" required />
      </Form.Group>
      <Form.Group controlId="formCliente">
        <Form.Label>Cliente</Form.Label>
        <Form.Control type="text" value={cliente} onChange={(e) => setCliente(e.target.value)} placeholder="Cliente" required />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">
        Cadastrar Hospedagem
      </Button>
    </Form>
  );
};

export default HospedagemForm;