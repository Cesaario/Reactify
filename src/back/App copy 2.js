import React, { useState, useEffect } from "react";
import Spotify from "spotify-web-api-js";

const s = new Spotify();

function App() {
  const [state, setState] = useState({token: ''});
  const [player, setPlayer] = useState({});

  useEffect(() => {
    const { access_token } = getHashParams();
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
      duration: 0
    });
  }, []);

  useEffect(() => {
    if (state.token !== "") {
      setState({...state, loggedIn: true});
      setTimeout(checkForPlayer, 1000, state.token);
    }
  }, [state.token]);

  useEffect(() => {
    transferPlaybackHere();
  }, [state.deviceId]);

  function checkForPlayer(authToken) {
    if (window.Spotify !== null) {
      const player = new window.Spotify.Player({
        name: "Reactify",
        getOAuthToken: cb => {
          cb(authToken);
        }
      });
      createEventHandlers(player);
      console.log("Conectado");
      player.connect();
      setPlayer(player);
    } else {
      setTimeout(checkForPlayer, 1000, authToken);
    }
  }
  
  function createEventHandlers(player) {
    player.on('initialization_error', e => { console.error(e); });
    player.on('authentication_error', e => {
      console.error(e);
      setState({...state, loggedIn: false});
    });
    player.on('account_error', e => { console.error(e); });
    player.on('playback_error', e => { console.error(e); });
  
    // Playback status updates
    player.on('player_state_changed', estado => { onStateChanged(estado); });
  
    // Ready
    player.on('ready', async data => {
      let { device_id } = data;
      console.log("Let the music play on!");
      setState({ ...state, deviceId: device_id });
    });
  }

  function transferPlaybackHere() {
    const { deviceId, token } = state;
    fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "device_ids": [ deviceId ],
        "play": false,
      }),
    });
  }

  function onStateChanged(estado){
    console.log(estado);
    if(estado != null){
      const { current_track } = estado.track_window;
      console.log(current_track);
      const { name } = current_track; 
      console.log(name);
      setState({...state, trackName: name});
    }
  }

  function toggle(){
    player.togglePlay();
  }

  function getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  return (
    <div className="App">
      <a href="http://localhost:8888">
        <button>Login</button>
      </a>
      <div>Tocando: {state.trackName}</div>
      <div>token: {state.token}</div>
      <button onClick={toggle}>Play/Pause</button>
    </div>
  );
}

export default App;