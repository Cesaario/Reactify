import React, {useState, useEffect} from 'react';
import Spotify from 'spotify-web-api-js';

const s = new Spotify();

function App() {
  const [params, setParams] = useState('');
  const [state, setState] = useState({logado: false, tocando: {nome: 'Nenhum'}});

  useEffect(() => {
    console.log("a");
    setParams(getHashParams());
  }, []);

  useEffect(() => {
    console.log("b");
    setState({
      logado: params.access_token ? true : false,
      tocando: {
        nome: 'Nenhum',
      }
    });
  }, [params]);

  if(params.access_token){
    s.setAccessToken(params.access_token);
  }

  function getHashParams(){
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  async function checar(){
    console.log('checando...');
    const response = await s.getMyCurrentPlaybackState();
    setState({
      logado: params.access_token ? true : false,
      tocando: {
        nome: response.item.name,
      }
    });
    console.log(response);
  }

  return (
    <div className="App">
      <a href='http://localhost:8888'>
        <button>Login</button>
      </a>
      <div>Tocando: {state.tocando.nome}</div>
      <button onClick={checar}>Checar</button>
    </div>
  );
}

export default App;
