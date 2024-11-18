import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';
import { FaHome, FaTachometerAlt, FaPlus, FaClipboardList } from 'react-icons/fa';
import logo from '../images/logo.svg';
import styles from './navbar.module.css';

const NavBar = () => {
    const getNavigationItems = () => {
        return [
            {label: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt />},
            {label: "Adicionar projeto", path: "/adicionarProjeto", icon: <FaPlus />},
            {label: "Vagas Disponíveis", path: "/auditorias", icon: <FaClipboardList />}
        ]
    }

    return (
        <Navbar collapseOnSelect expand="lg" className={styles.navbar} variant="dark">
            <Container fluid>
                <Navbar.Brand href="/">
                    <img
                        src={logo}
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                        alt="Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <Nav.Link href="/"><FaHome /> Home</Nav.Link>
                        {getNavigationItems().map((item, index) => (
                            <Nav.Link key={index} href={item.path}>{item.icon} {item.label}</Nav.Link>
                        ))}
                    </Nav>
                    <Nav className='ms-auto'> 
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;