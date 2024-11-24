import React, { useState, useEffect } from 'react';
import { ListGroup, Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

const ClienteList = () => {
  const [clientes, setClientes] = useState<any[]>([]);
  const [dependentes, setDependentes] = useState<any[]>([]);
  const [selectedCliente, setSelectedCliente] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCliente, setEditedCliente] = useState<any>(null);

  useEffect(() => {
    const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
    setClientes(clientes);
    const dependentes = JSON.parse(localStorage.getItem('dependentes') || '[]');
    setDependentes(dependentes);
  }, []);

  const handleDelete = (id: number) => {
    const updatedClientes = clientes.filter(cliente => cliente.id !== id);
    setClientes(updatedClientes);
    localStorage.setItem('clientes', JSON.stringify(updatedClientes));

    const hospedagens = JSON.parse(localStorage.getItem('hospedagens') || '[]');
    const updatedHospedagens = hospedagens.filter((hospedagem: any) => hospedagem.cliente !== id);
    localStorage.setItem('hospedagens', JSON.stringify(updatedHospedagens));

    Swal.fire('Excluído!', 'O cliente e suas reservas foram excluídos com sucesso.', 'success');
  };

  const handleEdit = (id: number, updatedCliente: any) => {
    const updatedClientes = clientes.map(cliente => cliente.id === id ? updatedCliente : cliente);
    setClientes(updatedClientes);
    localStorage.setItem('clientes', JSON.stringify(updatedClientes));
    setShowModal(false);
    Swal.fire('Editado!', 'O cliente foi editado com sucesso.', 'success');
  };

  const handleShowModal = (cliente: any) => {
    setSelectedCliente(cliente);
    setEditedCliente(cliente);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
  };

  const handleSave = () => {
    handleEdit(selectedCliente.id, editedCliente);
    setIsEditing(false);
  };

  const getDependentes = (clienteId: number) => {
    return dependentes.filter(dependente => dependente.clienteId === clienteId);
  };

  return (
    <div>
      <ListGroup>
        {clientes.map((cliente) => (
          <ListGroup.Item key={cliente.id} className="d-flex justify-content-between align-items-center">
            <div>
              {cliente.nome} - {cliente.email} - {cliente.documentoValor}
            </div>
            <Button variant="primary" onClick={() => handleShowModal(cliente)}>Ver</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {selectedCliente && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Informações do Cliente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formNome">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedCliente.nome}
                  readOnly={!isEditing}
                  onChange={(e) => setEditedCliente({ ...editedCliente, nome: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  defaultValue={selectedCliente.email}
                  readOnly={!isEditing}
                  onChange={(e) => setEditedCliente({ ...editedCliente, email: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formDocumentoTipo">
                <Form.Label>Tipo de Documento</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedCliente.documentoTipo}
                  readOnly={!isEditing}
                  onChange={(e) => setEditedCliente({ ...editedCliente, documentoTipo: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formDocumentoValor">
                <Form.Label>Documento</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedCliente.documentoValor}
                  readOnly={!isEditing}
                  onChange={(e) => setEditedCliente({ ...editedCliente, documentoValor: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formEndereco">
                <Form.Label>Endereço</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedCliente.endereco}
                  readOnly={!isEditing}
                  onChange={(e) => setEditedCliente({ ...editedCliente, endereco: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formDataNascimento">
                <Form.Label>Data de Nascimento</Form.Label>
                <Form.Control
                  type="date"
                  defaultValue={selectedCliente.dataNascimento}
                  readOnly={!isEditing}
                  onChange={(e) => setEditedCliente({ ...editedCliente, dataNascimento: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formTelefone">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedCliente.telefone}
                  readOnly={!isEditing}
                  onChange={(e) => setEditedCliente({ ...editedCliente, telefone: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formDependentes">
                <Form.Label>Dependentes</Form.Label>
                <ListGroup>
                  {getDependentes(selectedCliente.id).map((dependente) => (
                    <ListGroup.Item key={dependente.id}>
                      {dependente.nome} - {dependente.documentoValor}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {isEditing ? (
              <Button variant="primary" onClick={handleSave}>Salvar</Button>
            ) : (
              <Button variant="secondary" onClick={() => setIsEditing(true)}>Editar</Button>
            )}
            <Button variant="danger" onClick={() => handleDelete(selectedCliente.id)}>Excluir</Button>
            <Button variant="secondary" onClick={handleCloseModal}>Fechar</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ClienteList;