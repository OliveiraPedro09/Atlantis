import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Dropdown } from 'react-bootstrap';
import { FaHome, FaTachometerAlt, FaPlus, FaClipboardList } from 'react-icons/fa';
import logo from '../images/logo.svg';
import styles from './navbar.module.css';
import DropdownComponent from './Dropdown/dropdownComponent';

const NavBar = () => {
    const getNavigationItems = () => {
        return [
            {label: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt />},
            {label: "Clientes", path: "/auditorias", icon: <FaClipboardList />}
        ]
    }

    const getDropdownItems = () => {
        return [
            {label: "Novo Projeto", path: "/novoProjeto"},
            {label: "Gerenciar Projetos", path: "/gerenciarProjetos"}
        ]
    }

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
                        <Nav.Link href="/"><FaHome /> Home</Nav.Link>
                        {getNavigationItems().map((item, index) => (
                            <Nav.Link key={index} href={item.path}>{item.icon} {item.label}</Nav.Link>
                        ))}
                        <DropdownComponent/>
                    </Nav>
                    <Nav className='ms-auto'> 
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;