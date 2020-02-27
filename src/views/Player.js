import React, {useState, useEffect, useRef} from 'react'
import Progress from '../components/Progress'
import Album from '../components/Album'
import Info from '../components/Info'
import Controller from '../components/Controller'
import Button from '@material-ui/core/Button';
import { ColorExtractor } from 'react-color-extractor'

import './Player.css'

import Spotify from "spotify-web-api-js";
const s = new Spotify();


function Player(){

    const [colors, setColors] = useState(['#ffffff', '#ffffff']);
    const [state, setState] = useState({token: ''});
    const [player, setPlayer] = useState(undefined);
    const [musica, setMusica] = useState({});
    const [albumUrl, setAlbumUrl] = useState('');
    const [tempo, setTempo] = useState({pos: 0, dur: 0});
    const playerRef = useRef(player);

    useEffect(() => {
        console.log('aisdiuahisud');
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
        setTimeout(getState, 1000);
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

    useEffect(() => {
        if(musica.album && musica.album.images){
            setAlbumUrl(musica.album.images[0].url);
        }
    }, [musica]);

    function getState(){
        if(playerRef.current){
            playerRef.current.getCurrentState().then(state => {
                if (!state) {
                  console.error('User is not playing music through the Web Playback SDK');
                  return;
                }
                setTempo({
                    pos: state.position,
                    dur: state.duration
                })
                console.log(state);
              });
        }
        setTimeout(getState, 1000);
    }

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
            playerRef.current = player;
        } else {
            setTimeout(checkForPlayer, 1000, authToken);
        }
    }
      
    function createEventHandlers(player) {
        player.on('initialization_error', e => { console.error(e); });
        player.on('authentication_error', e => {
            console.error(e);
            setState({ ...state, loggedIn: false });
        });
        player.on('account_error', e => { console.error(e); });
        player.on('playback_error', e => { console.error(e); });

        // Playback status updates
        player.on('player_state_changed', estado => { onStateChanged(estado); });

        // Ready
        player.on('ready', async data => {
            let { device_id } = data;
            console.log("Pronto!");
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
                "device_ids": [deviceId],
                "play": false,
            }),
        });
    }
    
    function onStateChanged(estado) {
        console.log(estado);
        if (estado != null) {
            const { current_track } = estado.track_window;
            console.log('current', current_track);
            setMusica(current_track);
            setState({ ...state, trackName: current_track.name });
        }
    }

    function getHashParams() {
        var hashParams = {};
        /*var e,
            r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ((e = r.exec(q))) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }*/
        console.log("bbbbbbb");
        const url = new URL(window.location.href);
        const tokens = {
            access_token: url.searchParams.get('access_token'),
            refresh_token: url.searchParams.get('refresh_token')
        };
        console.log(tokens);
        return tokens;
        //return hashParams;
    }

    function gerarCores(cores){
        setColors(cores);
    }

    return(
        <>
        {
            state.loggedIn ? 
            (
                <div className='loginDiv'>
                    <Button href="https://reactify-auth-test.herokuapp.com/login" variant="contained" color='primary'>Faça login agora!</Button>
                </div>
            ):(
                <div className='playerDiv' style={{backgroundImage: `linear-gradient(${colors[0]}, ${colors[1]})`}}>
                    <ColorExtractor src={albumUrl} getColors={gerarCores}/>
                    <Album albumUrl={albumUrl}></Album>
                    <Info musica={musica}></Info>
                    <Controller player={player}></Controller>
                    <Progress tempo={tempo}></Progress>
                </div>
            )
        }
        </>
    );
}

export default Player;