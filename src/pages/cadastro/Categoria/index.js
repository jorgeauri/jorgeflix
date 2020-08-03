import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import config from '../../../config';
import categoriasRepository from '../../../repositories/categorias';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { ToastContainer, toast } from 'react-toastify';

function CadastroCategoria() {
  const valoresIniciais = {
    titulo: '',
    descricao: '',
    cor: '',
  };

  const { handleChange, values, clearForm } = useForm(valoresIniciais);

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    /* const URL = window.location.hostname.includes('localhost') 
    ? 'http://localhost:8080/categorias'
    : 'https://jorgeflix.herokuapp.com/categorias'; */

    fetch(`${config.URL_BACKEND_TOP}/categorias`)
      .then(async (respostaDoServer) => {
        const resposta = await respostaDoServer.json();
        setCategorias([
          ...resposta,
        ]);
      });

  }, []);

  function handleSubmit(event) {
    event.preventDefault()
    try {
      categoriasRepository
        .create({
          titulo: values.titulo,
          cor: values.cor,
          descricao: values.descricao,
        })
        .then(() => {
          setCategorias([...categorias, values])
          clearForm()
          toast.success('Categoria cadastrada com sucesso!')
        })
    } catch (error) {
      toast.error('Não foi possível cadastar a caterdoria.')
    }
  }

  async function handleDelete(id) {
    try {
      await fetch(`${config.URL_BACKEND_TOP}/categorias/${id}`, {
        method: 'DELETE',
      })

      const updatedList = categorias.filter((item) => item.id !== id)
      setCategorias(updatedList)

      toast.error('Categoria apagada com sucesso!')
    } catch (error) {
      toast.error('Não foi possível apagar. Entre em contato com o administrador.')
    }
  }

  return (
    <PageDefault>
      <form onSubmit={handleSubmit}>
        <h1>Nova categoria</h1>
        <FormField
          id="titulo"
          label="Nome da Categoria"
          name="titulo"
          type="text"
          value={values.titulo}
          onChange={handleChange}
        />

        <FormField
          label="Descrição"
          type="textarea"
          name="descricao"
          value={values.descricao}
          onChange={handleChange}
        />

        <FormField
          label="Cor"
          type="color"
          name="cor"
          value={values.cor}
          onChange={handleChange}
        />

        <ButtonCategory>
          <Button type="submit" className="btn-salvar"> Cadastrar </Button>
          <Button className="btn-limpar" type="button"> Limpar </Button>
          <Button className="btn-cad" type="button"><Link to="/"> Home </Link></Button>
          <Button className="btn-back" type="button"><Link to="/cadastro/video" > Voltar </Link></Button>
        </ButtonCategory>
        <ToastContainer position="top-right" autoClose={3000} />
      </form>

      {categorias.length === 0 && (
        <Loading>
          <PacmanLoader size={25} color={'#4EBFE4'} />
        </Loading>
      )}



      {/*   <ul>
        {categorias.map((categoria) => {
          return (
            <li key={`${categoria.titulo}`}>
              {categoria.titulo}
            </li>
          )
        })}
      </ul> */}

      <Table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descrição</th>
            <Th>Editar</Th>
            <Th>Apagar</Th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria, indice) => {
            return (
              <tr key={indice}>
                <td>{categoria.titulo}{categoria.name}</td>
                <td>{categoria.descricao}</td>
                <Td>
                  <Button className="btn-edit">
                    <MdModeEdit size={25} />
                  </Button>
                </Td>
                <Td>
                  <Button className="btn-delete">
                    <MdDelete
                      size={25}
                      onClick={() => handleDelete(categoria.id)}
                    />
                  </Button>
                </Td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </PageDefault>
  )
}

export default CadastroCategoria;

const Loading = styled.div`
  margin: 50px;
  display: flex;
  justify-content: center;
`

const Th = styled.th`
  text-align: center !important;
`

const Td = styled.td`
  text-align: center !important;
  .btn-delete {
    background: red;
    width: 80px;
    height: 54px;
    border: none;
    margin: 5px 15px 20px 0;
  }
  .btn-edit {
    background: blueviolet;
    width: 80px;
    height: 54px;
    border: none;
    margin: 5px 15px 20px 0;
  }
`

const ButtonCategory = styled.div`
  .btn-salvar {
    background: var(--primary);
    width: 180px;
    height: 54px;
    border: none;
    margin: 5px 15px 20px 0;
  }
  .btn-limpar {
    background: var(--blackLighter);
    width: 180px;
    height: 54px;
    border: none;
    margin: 5px 15px 20px 0;
  }
  .btn-cad{
    background: royalblue;
    width: 180px;
    height: 54px;
    border: none;
    margin: 5px 15px 20px 0;
  }
  .btn-back{
    background: grey;
    width: 180px;
    height: 54px;
    border: none;
    margin: 5px 15px 20px 0;
  }
`

const Table = styled.table`
  border: 1px solid #2a7ae4;
  border-collapse: collapse;
  width: 100%;
  margin: 20px 0;
  thead tr th {
    padding: 15px;
    border: 1px solid #2a7ae4;
  }
  thead {
    border-bottom: 1px solid #2a7ae4;
  }
  td,
  th {
    text-align: left;
    padding: 10px;
  }
`