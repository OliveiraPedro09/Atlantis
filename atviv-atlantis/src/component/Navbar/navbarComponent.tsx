import React from 'react';
import { Navbar, Nav, Dropdown, Container, Modal, Button } from 'react-bootstrap';
import { FaHome, FaList, FaUserPlus, FaBed } from 'react-icons/fa';
import ClienteForm from '../client/ClienteForm';
import HospedagemForm from '../hospedagem/HospedagemForm';
import ClienteList from '../client/ClienteList';
import HospedagemList from '../hospedagem/HospedagemList';
import styles from '../css/navbar.module.css';
import logo from "../images/logo.svg";

const NavBar = () => {
  const [showClientesModal, setShowClientesModal] = React.useState(false);
  const [showHospedagensModal, setShowHospedagensModal] = React.useState(false);
  const [showCadastroClienteModal, setShowCadastroClienteModal] = React.useState(false);
  const [showCadastroHospedagemModal, setShowCadastroHospedagemModal] = React.useState(false);

  const handleShowClientesModal = () => setShowClientesModal(true);
  const handleCloseClientesModal = () => setShowClientesModal(false);

  const handleShowHospedagensModal = () => setShowHospedagensModal(true);
  const handleCloseHospedagensModal = () => setShowHospedagensModal(false);

  const handleShowCadastroClienteModal = () => setShowCadastroClienteModal(true);
  const handleCloseCadastroClienteModal = () => setShowCadastroClienteModal(false);

  const handleShowCadastroHospedagemModal = () => setShowCadastroHospedagemModal(true);
  const handleCloseCadastroHospedagemModal = () => setShowCadastroHospedagemModal(false);

  return (
    <Navbar bg="light" expand="lg" className={styles.navbar}>
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            height="50"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className={styles['nav-link']}><FaHome /> Home</Nav.Link>
            <Dropdown>
              <Dropdown.Toggle variant="link" id="dropdown-basic" className={styles['dropdown-toggle']}>
                <FaList /> Listagens
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleShowClientesModal} className={styles['dropdown-item']}>Listagem de Clientes</Dropdown.Item>
                <Dropdown.Item onClick={handleShowHospedagensModal} className={styles['dropdown-item']}>Listagem de Hospedagens</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Nav.Link onClick={handleShowCadastroClienteModal} className={styles['nav-link']}><FaUserPlus /> Cadastrar Cliente</Nav.Link>
            <Nav.Link onClick={handleShowCadastroHospedagemModal} className={styles['nav-link']}><FaBed /> Cadastrar Hospedagem</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <Modal show={showClientesModal} onHide={handleCloseClientesModal}>
        <Modal.Header closeButton>
          <Modal.Title>Clientes Cadastrados</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ClienteList />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseClientesModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showHospedagensModal} onHide={handleCloseHospedagensModal}>
        <Modal.Header closeButton>
          <Modal.Title>Hospedagens Cadastradas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <HospedagemList />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseHospedagensModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCadastroClienteModal} onHide={handleCloseCadastroClienteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ClienteForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCadastroClienteModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCadastroHospedagemModal} onHide={handleCloseCadastroHospedagemModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar Hospedagem</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <HospedagemForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCadastroHospedagemModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
};

export default NavBar;