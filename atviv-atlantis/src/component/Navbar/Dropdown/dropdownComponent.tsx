import React from 'react';
import { Dropdown, Nav } from 'react-bootstrap';
import styles from './dropdown.module.css';
import { FaPlus } from 'react-icons/fa';


interface DropdownComponentProps extends React.HTMLAttributes<HTMLDivElement> {}

const DropdownComponent: React.FC<DropdownComponentProps> = ({ className }) => {

  return (
    <Nav.Item className={`${styles.dropdownHover} ${className}`}>
      <Dropdown show={true}>
        <Dropdown.Toggle
          as={Nav.Link}
          variant="link"
          id="nav-dropdown"
          className={`${styles.navLink} ${styles.dropdownToggle}`}
        >
          Cadastrar
          
        </Dropdown.Toggle>

        <Dropdown.Menu className={`${styles.dropdownMenu}`}>
          <Dropdown.Item className={styles.dropdownItem}>Hospedagem</Dropdown.Item>
          <Dropdown.Item className={styles.dropdownItem}>Clientes</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  );
};

export default DropdownComponent;