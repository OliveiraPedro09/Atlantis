import React, { useState, useEffect } from 'react';
import { ListGroup, Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

const HospedagemList = () => {
  const [hospedagens, setHospedagens] = useState<any[]>([]);
  const [selectedHospedagem, setSelectedHospedagem] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedHospedagem, setEditedHospedagem] = useState<any>(null);

  useEffect(() => {
    const hospedagens = JSON.parse(localStorage.getItem('hospedagens') || '[]');
    setHospedagens(hospedagens);
  }, []);

  const handleDelete = (id: number) => {
    const updatedHospedagens = hospedagens.filter(hospedagem => hospedagem.id !== id);
    setHospedagens(updatedHospedagens);
    localStorage.setItem('hospedagens', JSON.stringify(updatedHospedagens));
    setShowModal(false);
    Swal.fire('Excluído!', 'A hospedagem foi excluída com sucesso.', 'success');
  };

  const handleEdit = (id: number, updatedHospedagem: any) => {
    const updatedHospedagens = hospedagens.map(hospedagem => hospedagem.id === id ? updatedHospedagem : hospedagem);
    setHospedagens(updatedHospedagens);
    localStorage.setItem('hospedagens', JSON.stringify(updatedHospedagens));
    setShowModal(false);
    Swal.fire('Editado!', 'A hospedagem foi editada com sucesso.', 'success');
  };

  const handleShowModal = (hospedagem: any) => {
    setSelectedHospedagem(hospedagem);
    setEditedHospedagem(hospedagem);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
  };

  const handleSave = () => {
    handleEdit(selectedHospedagem.id, editedHospedagem);
    setIsEditing(false);
  };

  return (
    <div>
      <ListGroup>
        {hospedagens.map((hospedagem) => (
          <ListGroup.Item key={hospedagem.id} className="d-flex justify-content-between align-items-center">
            <div>
              {hospedagem.cliente} - {hospedagem.dataInicio} - {hospedagem.dataFim}
            </div>
            <Button variant="primary" onClick={() => handleShowModal(hospedagem)}>Ver</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {selectedHospedagem && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Informações da Hospedagem</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formTipo">
                <Form.Label>Tipo</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedHospedagem.tipo}
                  readOnly={!isEditing}
                  onChange={(e) => setEditedHospedagem({ ...editedHospedagem, tipo: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formDescricao">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedHospedagem.descricao}
                  readOnly={!isEditing}
                  onChange={(e) => setEditedHospedagem({ ...editedHospedagem, descricao: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formCliente">
                <Form.Label>Cliente</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedHospedagem.cliente}
                  readOnly={!isEditing}
                  onChange={(e) => setEditedHospedagem({ ...editedHospedagem, cliente: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formDataInicio">
                <Form.Label>Data Início</Form.Label>
                <Form.Control
                  type="date"
                  defaultValue={selectedHospedagem.dataInicio}
                  readOnly={!isEditing}
                  onChange={(e) => setEditedHospedagem({ ...editedHospedagem, dataInicio: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formDataFim">
                <Form.Label>Data Fim</Form.Label>
                <Form.Control
                  type="date"
                  defaultValue={selectedHospedagem.dataFim}
                  readOnly={!isEditing}
                  onChange={(e) => setEditedHospedagem({ ...editedHospedagem, dataFim: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formValor">
                <Form.Label>Valor (R$)</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedHospedagem.valor}
                  readOnly={!isEditing}
                  onChange={(e) => setEditedHospedagem({ ...editedHospedagem, valor: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {isEditing ? (
              <Button variant="primary" onClick={handleSave}>Salvar</Button>
            ) : (
              <Button variant="secondary" onClick={() => setIsEditing(true)}>Editar</Button>
            )}
            <Button variant="danger" onClick={() => handleDelete(selectedHospedagem.id)}>Excluir</Button>
            <Button variant="secondary" onClick={handleCloseModal}>Fechar</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default HospedagemList;