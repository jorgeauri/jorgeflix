import { useState } from 'react';

function useForm(valoresIniciais) {
    const [values, setValues] = useState(valoresIniciais);
    
    function setValue(chave, valor) {
      //chave: nome, descrição, "valor variavel..."
      setValues({
        ...values,
        [chave]: valor, //nome: 'valor'
      })
    }
  
    function handleChange(infosDoEvento) {
      setValue(
        infosDoEvento.target.getAttribute('name'),
        infosDoEvento.target.value
      );
    }
  
  function clearForm() {
    setValues(valoresIniciais);
  }
  
    return {
      values,
      handleChange,
      clearForm,
    };
  }

  export default useForm;