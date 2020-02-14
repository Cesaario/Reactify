import React, {useState, useEffect} from 'react';
import Spotify from 'spotify-web-api-js';

const s = new Spotify();

function App() {

  const [state, setState] = useState({token: ''});
  const [intervalo, setIntervalo] = useState(0);
  //const [params, setParams] = useState('');

  useEffect(() => {
    const {access_token} = getHashParams();
    setState({
      token: access_token,
      deviceId: "",
      loggedIn: false,
      error: "",
      trackName: "Track Name",
      artistName: "Artist Name",
      albumName: "Album Name",
      playing: false,
      position: 0,
      duration: 0,
    });
  }, []);

  useEffect(() => {
    if (state.token !== "") {
      console.log('entrou');
      const interv = setInterval(checkForPlayer, 1000);
      console.log(interv);
      setIntervalo(interv);
    }
  }, [state.token]);

  function checkForPlayer() {
    const { token } = state;
  
    console.log("checando");
    if (window.Spotify !== null) {
      const player = new window.Spotify.Player({
        name: "Reactify",
        getOAuthToken: cb => { cb(token); },
      });
      // this.createEventHandlers();
      player.connect();
      console.log(intervalo);
      clearInterval(intervalo);
    }
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

  return (
    <div className="App">
      <a href='http://localhost:8888'>
        <button>Login</button>
      </a>
      <div>Tocando: {state.trackName}</div>
      <div>token: {state.token}</div>
    </div>
  );
}

export default App;
