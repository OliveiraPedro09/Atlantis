import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Button, Collapse } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import Swal from 'sweetalert2';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import "../css/home.module.css";

const ClienteForm = () => {
  const { control, handleSubmit, reset, watch } = useForm();
  const [validated, setValidated] = useState(false);
  const [showDependenteFields, setShowDependenteFields] = useState(false);
  const documentoTipo = watch('documentoTipo', '');
  const dependenteDocumentoTipo = watch('dependenteDocumentoTipo', '');

  const onSubmit = (data: any) => {
    setValidated(true);

    if (!data.documentoValor) {
      alert('Por favor, preencha o documento.');
      return;
    }

    const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
    const newCliente = { id: Date.now(), ...data };
    clientes.push(newCliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));

    if (data.dependenteNome) {
      const dependentes = JSON.parse(localStorage.getItem('dependentes') || '[]');
      const newDependente = {
        id: Date.now(),
        clienteId: newCliente.id,
        nome: data.dependenteNome,
        documentoTipo: data.dependenteDocumentoTipo,
        documentoValor: data.dependenteDocumentoValor,
      };
      dependentes.push(newDependente);
      localStorage.setItem('dependentes', JSON.stringify(dependentes));
    }

    reset();
    setValidated(false);
    setShowDependenteFields(false);

    Swal.fire('Sucesso!', 'Cliente cadastrado com sucesso.', 'success');
  };

  const getDocumentoMask = (tipo: string) => {
    switch (tipo) {
      case 'CPF':
        return '999.999.999-99';
      case 'RG':
        return '99.999.999-9';
      case 'Passaporte':
        return '*********';
      default:
        return '';
    }
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formNome">
          <Form.Label>Nome</Form.Label>
          <Controller
            name="nome"
            control={control}
            defaultValue=""
            render={({ field }) => <Form.Control {...field} type="text" placeholder="Nome" required />}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, insira o nome.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => <Form.Control {...field} type="email" placeholder="Email" required />}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, insira o email.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formDocumentoTipo">
          <Form.Label>Tipo de Documento</Form.Label>
          <Controller
            name="documentoTipo"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div className="select-wrapper">
                <Form.Select {...field}>
                  <option value="">Selecione um tipo de documento</option>
                  <option value="CPF">CPF</option>
                  <option value="RG">RG</option>
                  <option value="Passaporte">Passaporte</option>
                </Form.Select>
              </div>
            )}
          />
        </Form.Group>
        <Form.Group controlId="formDocumentoValor">
          <Form.Label>Documento</Form.Label>
          <Controller
            name="documentoValor"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputMask
                {...field}
                mask={getDocumentoMask(documentoTipo)}
                maskChar="_"
                placeholder="Documento"
                required
              >
                {(inputProps) => <Form.Control {...inputProps} />}
              </InputMask>
            )}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, insira o documento.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formEndereco">
          <Form.Label>Endereço</Form.Label>
          <Controller
            name="endereco"
            control={control}
            defaultValue=""
            render={({ field }) => <Form.Control {...field} type="text" placeholder="Endereço" required />}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, insira o endereço.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formDataNascimento">
          <Form.Label>Data de Nascimento</Form.Label>
          <Controller
            name="dataNascimento"
            control={control}
            defaultValue=""
            render={({ field }) => <Form.Control {...field} type="date" placeholder="Data de Nascimento" required />}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, insira a data de nascimento.
          </Form.Control.Feedback>
          <br />
        </Form.Group>
        <div className="dependente-toggle" onClick={() => setShowDependenteFields(!showDependenteFields)}>
          {showDependenteFields ? 'Esconder Dependente' : 'Adicionar Dependente'} {showDependenteFields ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        <br />
        <Collapse in={showDependenteFields}>
          <div id="dependente-fields">
            <Form.Group controlId="formDependenteNome">
              <Form.Label>Nome do Dependente</Form.Label>
              <Controller
                name="dependenteNome"
                control={control}
                defaultValue=""
                render={({ field }) => <Form.Control {...field} type="text" placeholder="Nome do Dependente" />}
              />
            </Form.Group>
            <Form.Group controlId="formDependenteDocumentoTipo">
              <Form.Label>Tipo de Documento do Dependente</Form.Label>
              <Controller
                name="dependenteDocumentoTipo"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <div className="select-wrapper">
                    <Form.Select {...field}>
                      <option value="">Selecione um tipo de documento</option>
                      <option value="CPF">CPF</option>
                      <option value="RG">RG</option>
                      <option value="Passaporte">Passaporte</option>
                    </Form.Select>
                  </div>
                )}
              />
            </Form.Group>
            <Form.Group controlId="formDependenteDocumentoValor">
              <Form.Label>Documento do Dependente</Form.Label>
              <Controller
                name="dependenteDocumentoValor"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputMask
                    {...field}
                    mask={getDocumentoMask(dependenteDocumentoTipo)}
                    maskChar="_"
                    placeholder="Documento do Dependente"
                  >
                    {(inputProps) => <Form.Control {...inputProps} />}
                  </InputMask>
                )}
              />
            </Form.Group>
          </div>
        </Collapse>
        <Button variant="primary" type="submit" className="mt-3">
          Cadastrar Cliente
        </Button>
      </Form>
    </>
  );
};

export default ClienteForm;