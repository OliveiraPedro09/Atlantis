import React, { useEffect, useState } from 'react';
import { ListGroup, Button } from 'react-bootstrap';

const HospedagemList = () => {
  const [hospedagens, setHospedagens] = useState<any[]>([]);

  useEffect(() => {
    const hospedagens = JSON.parse(localStorage.getItem('hospedagens') || '[]');
    setHospedagens(hospedagens);
  }, []);

  const handleDelete = (id: number) => {
    const updatedHospedagens = hospedagens.filter(hospedagem => hospedagem.id !== id);
    setHospedagens(updatedHospedagens);
    localStorage.setItem('hospedagens', JSON.stringify(updatedHospedagens));
  };

  return (
    <div>
      <ListGroup>
        {hospedagens.map((hospedagem) => (
          <ListGroup.Item key={hospedagem.id} className="d-flex justify-content-between align-items-center">
            {hospedagem.tipo} - {hospedagem.status} - {hospedagem.cliente}
            <Button variant="danger" onClick={() => handleDelete(hospedagem.id)}>Excluir</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default HospedagemList;