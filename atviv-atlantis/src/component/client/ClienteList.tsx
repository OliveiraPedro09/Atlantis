import React, { useEffect, useState } from 'react';
import { ListGroup, Button } from 'react-bootstrap';

const ClienteList = () => {
  const [clientes, setClientes] = useState<any[]>([]);

  useEffect(() => {
    const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
    setClientes(clientes);
  }, []);

  const handleDelete = (id: number) => {
    const updatedClientes = clientes.filter(cliente => cliente.id !== id);
    setClientes(updatedClientes);
    localStorage.setItem('clientes', JSON.stringify(updatedClientes));
  };

  return (
    <div>
      <ListGroup>
        {clientes.map((cliente) => (
          <ListGroup.Item key={cliente.id} className="d-flex justify-content-between align-items-center">
            {cliente.nome} - {cliente.email} - {cliente.telefone}
            <Button variant="danger" onClick={() => handleDelete(cliente.id)}>Excluir</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default ClienteList;