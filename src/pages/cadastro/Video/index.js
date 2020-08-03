import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import useForm from '../../../hooks/useForm';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';
import { ToastContainer } from 'react-toastify';

function CadastroVideo() {
  const history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const categoryTitles = categorias.map(({ titulo }) => titulo);
  const { handleChange, values, clearForm } = useForm({
    titulo: '',
    url: '',
    categoria: '',
  });

  useEffect(() => {
    categoriasRepository
      .getAll()
      .then((categoriasFromServer) => {
        setCategorias(categoriasFromServer);
      });
  }, []);

  function handleSubmit(event) {
    event.preventDefault()
    // alert('Video Cadastrado com sucesso !!!');
    const categoriaEscolhida = categorias.find((categoria) => {
      return categoria.titulo === values.categoria
    })
    videosRepository
      .create({
        titulo: values.titulo,
        url: values.url,
        categoriaId: categoriaEscolhida.id,
      })
      .then(() => {
        history.push('/')
      //  window.alert('Video cadastrado com sucesso!');
      })
  }

  function handleClear(event) {
    event.preventDefault()
    clearForm()
  }

  
  return (
    <PageDefault>

      <form onSubmit={handleSubmit}>
        <h1>Cadastro de Video</h1>

        {/* <form onSubmit={(event) => {
        event.preventDefault();
        //alert('video cadastrado com sucesso');

        const categoriaEscolhida = categorias.find((categoria) => {
          return categoria.titulo === values.categoria;
        });

        videosRepository.create({
          titulo: values.titulo,
          url: values.url,
          categoriaId: categoriaEscolhida.id,
        })
          .then(() => {
            history.push('/');
          });
      }} */}

        <FormField
          label="Título do Vídeo"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
        />

        <FormField
          label="URL"
          name="url"
          value={values.url}
          onChange={handleChange}
        />

        <FormField
          label="Categoria"
          name="categoria"
          value={values.categoria}
          onChange={handleChange}
          suggestions={categoryTitles}
        />

        <ButtonCategory>
          <Button type="submit" className="btn-salvar">Confirmar</Button>
          <Button className="btn-limpar" onClick={handleClear}>Limpar</Button>
          <Button className="btn-cad" type="button"><Link to="/cadastro/categoria" > Nova categoria </Link></Button>
          <Button className="btn-home" type="button"><Link to="/"> Home </Link></Button>

        </ButtonCategory>
      </form>
      <ToastContainer />
      {/* <Link to="/cadastro/categoria">
        Cadastrar Categoria
        </Link> */}
    </PageDefault>
  );
}

export default CadastroVideo;

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
  .btn-home {
    background: grey;
    width: 180px;
    height: 54px;
    border: none;
    margin: 5px 15px 20px 0;
  }
  .btn-cad {
    text-align: center !important;
    background: royalblue;
    width: 180px;
    height: 54px;
    border: none;
    margin: 5px 15px 20px 0;
  }
 
`