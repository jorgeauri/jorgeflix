import config from '../config';

const URL_VIDEOS = `${config.URL_BACKEND_TOP}/videos`;

/* function getAll() {
    return fetch(`${URL_VIDEOS}`)
      .then(async (respostaDoServer) => {
        if (respostaDoServer.ok) {
          const resposta = await respostaDoServer.json();
          return resposta;
        }
  
        throw new Error('Não foi possível pegar os dados :(');
      });
  } */

function create(objetoDoVideo) {
   return fetch(`${URL_VIDEOS}?_embed=videos`, {
       method: 'POST',
       headers: {
           'Content-type': 'application/json',
       },
       body: JSON.stringify(objetoDoVideo),
   })
      .then(async (respostaDoServer) => {
       if(respostaDoServer.ok){
           const resposta = await respostaDoServer.json();
           return resposta;
        }

        throw new Error('Não foi possível cadastrar os dados :(');
    });
}

export default {
    create,
   // getAll,
};