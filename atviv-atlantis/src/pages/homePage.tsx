import React from 'react';
import Dashboard from "../component/dashboard/Dashboard";
import "../component/css/home.module.css";

const HomePage = () => {
    return (
        <main>
            <div className="home-page">
                <section className="intro-section">
                    <h1>Bem-vindo ao Hotel Atlantis</h1>
                    <p>Descubra o conforto e a elegância do nosso hotel. Oferecemos acomodações de alta qualidade e serviços excepcionais para tornar sua estadia inesquecível.</p>
                </section>
                <section className="dashboard-section">
                    <Dashboard />
                </section>
            </div>
        </main>
    )
}

export default HomePage;