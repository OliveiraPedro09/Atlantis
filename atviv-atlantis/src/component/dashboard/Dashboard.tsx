import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Card, Row, Col } from 'react-bootstrap';
import "../css/dashboard.module.css";

const Dashboard = () => {
  const dataPie = [
    { name: 'Vazias', value: 10 },
    { name: 'Preenchidas', value: 20 },
  ];

  const dataBar = [
    { name: 'Casal Simples', value: 5 },
    { name: 'Familia Simples', value: 8 },
    { name: 'Familia Mais', value: 6 },
    { name: 'Familia Super', value: 4 },
    { name: 'Solteiro Simples', value: 7 },
    { name: 'Solteiro Mais', value: 10 },
  ];

  return (
    <Card className="p-3 dashboard-card">
      <h2 className="text-center">Dashboard</h2>
      <Row>
        <Col md={6} className="text-center">
          <h4>Hospedagens Vazias vs Preenchidas</h4>
          <PieChart width={400} height={400}>
            <Pie data={dataPie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
              {dataPie.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#0088FE' : '#00C49F'} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </Col>
        <Col md={6} className="text-center">
          <h4>Tipos de Hospedagens</h4>
          <BarChart width={600} height={300} data={dataBar}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </Col>
      </Row>
    </Card>
  );
};

export default Dashboard;