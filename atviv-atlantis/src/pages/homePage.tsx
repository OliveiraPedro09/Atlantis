import React from 'react';
import Dashboard from "../component/dashboard/Dashboard";
import ClienteForm from "../component/client/ClienteForm";
import HospedagemForm from "../component/hospedagem/HospedagemForm";
import HospedagemList from "../component/hospedagem/HospedagemList";
import ClienteList from "../component/client/ClienteList";
import "../component/css/home.module.css";

const HomePage = () => {
    return (
        <div className="home-page">
            <section className="dashboard-section">
                <Dashboard />
            </section>
            <section className="form-section">
                <div className="form-container">
                    <h3>Cadastrar Cliente</h3>
                    <ClienteForm />
                </div>
                <div className="form-container">
                    <h3>Cadastrar Hospedagem</h3>
                    <HospedagemForm />
                </div>
            </section>
            <section className="list-section">
                <div className="list-container">
                    <h3>Lista de Clientes</h3>
                    <ClienteList />
                </div>
                <div className="list-container">
                    <h3>Lista de Hospedagens</h3>
                    <HospedagemList />
                </div>
            </section>
        </div>
    )
}

export default HomePage;