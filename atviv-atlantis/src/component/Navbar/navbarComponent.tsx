import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Dropdown, Modal, Button } from 'react-bootstrap';
import { FaHome, FaList, FaUserPlus, FaBed } from 'react-icons/fa';
import logo from '../images/logo.svg';
import styles from "../css/navbar.module.css";
import ClienteForm from '../client/ClienteForm';
import ClienteList from '../client/ClienteList';
import HospedagemForm from '../hospedagem/HospedagemForm';
import HospedagemList from '../hospedagem/HospedagemList';

const NavBar = () => {
    const [showClientesModal, setShowClientesModal] = useState(false);
    const [showHospedagensModal, setShowHospedagensModal] = useState(false);
    const [showCadastroClienteModal, setShowCadastroClienteModal] = useState(false);
    const [showCadastroHospedagemModal, setShowCadastroHospedagemModal] = useState(false);

    const handleCloseClientesModal = () => setShowClientesModal(false);
    const handleShowClientesModal = () => setShowClientesModal(true);

    const handleCloseHospedagensModal = () => setShowHospedagensModal(false);
    const handleShowHospedagensModal = () => setShowHospedagensModal(true);

    const handleCloseCadastroClienteModal = () => setShowCadastroClienteModal(false);
    const handleShowCadastroClienteModal = () => setShowCadastroClienteModal(true);

    const handleCloseCadastroHospedagemModal = () => setShowCadastroHospedagemModal(false);
    const handleShowCadastroHospedagemModal = () => setShowCadastroHospedagemModal(true);

    return (
        <Navbar collapseOnSelect expand="lg" className={styles.navbar} variant="dark">
            <Container fluid>
                <Navbar.Brand>
                    <img
                        src={logo}
                        className={styles.logo}
                        alt="Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
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
                    <Nav className='ms-auto'> 
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
    )
}

export default NavBar;