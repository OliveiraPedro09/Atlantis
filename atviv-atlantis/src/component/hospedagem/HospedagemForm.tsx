import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { NumericFormat } from 'react-number-format';
import Swal from 'sweetalert2';
import "../css/hospedagem.module.css";

interface Hospedagem {
  id: number;
  tipo: string;
  descricao: string;
  cliente: string;
  dataInicio: string;
  dataFim: string;
  valor: string;
}

const HospedagemForm = () => {
  const [tipo, setTipo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [cliente, setCliente] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [valor, setValor] = useState('');
  const [clientes, setClientes] = useState<any[]>([]);
  const [validated, setValidated] = useState(false);
  const tiposAcomodacao = [
    'Casal Simples',
    'Familia Simples',
    'Familia Mais',
    'Familia Super',
    'Solteiro Simples',
    'Solteiro Mais'
  ];

  const vagasTotais: { [key: string]: number } = {
    'Casal Simples': 20,
    'Familia Simples': 14,
    'Familia Mais': 7,
    'Familia Super': 5,
    'Solteiro Simples': 11,
    'Solteiro Mais': 9,
  };

  useEffect(() => {
    const clientesCadastrados = JSON.parse(localStorage.getItem('clientes') || '[]');
    setClientes(clientesCadastrados);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidated(true);

    if (!tipo || !cliente || !dataInicio || !dataFim || !valor) {
      return;
    }

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

    if (vagasReservadas[tipo] >= vagasTotais[tipo]) {
      Swal.fire('Erro!', 'Não há vagas disponíveis para o tipo de acomodação selecionado.', 'error');
      return;
    }

    hospedagens.push({ id: Date.now(), tipo, descricao, cliente, dataInicio, dataFim, valor });
    localStorage.setItem('hospedagens', JSON.stringify(hospedagens));
    setTipo('');
    setDescricao('');
    setCliente('');
    setDataInicio('');
    setDataFim('');
    setValor('');
    setValidated(false);

    Swal.fire('Sucesso!', 'Hospedagem cadastrada com sucesso.', 'success');
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group controlId="formTipo">
        <Form.Label>Tipo</Form.Label>
        <div className="select-wrapper">
          <Form.Select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
            <option value="">Selecione um tipo de acomodação</option>
            {tiposAcomodacao.map((tipo, index) => (
              <option key={index} value={tipo}>{tipo}</option>
            ))}
          </Form.Select>
        </div>
        <Form.Control.Feedback type="invalid">
          Por favor, selecione um tipo de acomodação.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formDescricao">
        <Form.Label>Descrição</Form.Label>
        <Form.Control
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição (opcional)"
        />
      </Form.Group>
      <Form.Group controlId="formCliente">
        <Form.Label>Cliente</Form.Label>
        <div className="select-wrapper">
          <Form.Select value={cliente} onChange={(e) => setCliente(e.target.value)} required>
            <option value="">Selecione um cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.nome}>{cliente.nome}</option>
            ))}
          </Form.Select>
        </div>
        <Form.Control.Feedback type="invalid">
          Por favor, selecione um cliente.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formDataInicio">
        <Form.Label>Data Início</Form.Label>
        <Form.Control type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} required />
        <Form.Control.Feedback type="invalid">
          Por favor, insira a data de início.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formDataFim">
        <Form.Label>Data Fim</Form.Label>
        <Form.Control type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} required />
        <Form.Control.Feedback type="invalid">
          Por favor, insira a data de fim.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formValor">
        <Form.Label>Valor (R$)</Form.Label>
        <NumericFormat
          value={valor}
          onValueChange={(values) => setValor(values.value)}
          thousandSeparator="."
          decimalSeparator=","
          prefix="R$ "
          customInput={Form.Control as any}
          placeholder="Valor"
          required
        />
        <Form.Control.Feedback type="invalid">
          Por favor, insira o valor.
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">
        Cadastrar Hospedagem
      </Button>
    </Form>
  );
};

export default HospedagemForm;