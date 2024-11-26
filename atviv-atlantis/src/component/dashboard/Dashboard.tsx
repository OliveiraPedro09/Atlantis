/* src/component/dashboard/Dashboard.tsx */
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, Row, Col, Container } from 'react-bootstrap';
import "../css/dashboard.module.css";

interface Hospedagem {
  tipo: string;
}

const Dashboard = () => {
  const [dataPie, setDataPie] = useState<{ name: string; value: number }[]>([]);
  const [dataBar, setDataBar] = useState<{ name: string; value: number }[]>([]);

  const vagasTotais: { [key: string]: number } = {
    'Casal Simples': 20,
    'Familia Simples': 14,
    'Familia Mais': 7,
    'Familia Super': 5,
    'Solteiro Simples': 11,
    'Solteiro Mais': 9,
  };

  useEffect(() => {
    const hospedagens: Hospedagem[] = JSON.parse(localStorage.getItem('hospedagens') || '[]');

    const vagasReservadas: { [key: string]: number } = {
      'Casal Simples': 0,
      'Familia Simples': 0,
      'Familia Mais': 0,
      'Familia Super': 0,
      'Solteiro Simples': 0,
      'Solteiro Mais': 0,
    };

    hospedagens.forEach((hospedagem: Hospedagem) => {
      if (vagasReservadas[hospedagem.tipo] !== undefined) {
        vagasReservadas[hospedagem.tipo]++;
      }
    });

    const dataBar = Object.keys(vagasTotais).map(tipo => ({
      name: tipo,
      value: vagasReservadas[tipo],
    }));

    const totalVagas = Object.values(vagasTotais).reduce((acc, val) => acc + val, 0);
    const totalReservadas = Object.values(vagasReservadas).reduce((acc, val) => acc + val, 0);

    const dataPie = [
      { name: 'Vagas Preenchidas', value: totalReservadas },
      { name: 'Vagas Vazias', value: totalVagas - totalReservadas },
    ];

    setDataBar(dataBar);
    setDataPie(dataPie);
  }, []);

  return (
    <Container fluid className="dashboard-container">
      <Card className="p-3 dashboard-card">
        <h2 className="text-center">Dashboard</h2>
        <Row>
          <Col xs={12} md={6} className="text-center">
            <h4>Hospedagens Vazias vs Preenchidas</h4>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie data={dataPie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius="80%" fill="#8884d8">
                    {dataPie.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#0088FE' : '#00C49F'} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Col>
          <Col xs={12} md={6} className="text-center">
            <h4>Tipos de Hospedagens</h4>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={dataBar} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Dashboard;