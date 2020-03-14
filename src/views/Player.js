import React, {useState, useEffect, useRef} from 'react'
import Progress from '../components/Progress'
import Album from '../components/Album'
import Info from '../components/Info'
import Controller from '../components/Controller'
import Volume from '../components/Volume'
import Pesquisa from '../components/Pesquisa'
import { ColorExtractor } from 'react-color-extractor'

import './Player.css'

import { getState, checkForPlayer, transferPlaybackHere, getHashParams } from '../Spotify'

//import Spotify from "spotify-web-api-js";
//const s = new Spotify();

function Player(){

    const [colors, setColors] = useState(['#ffffff', '#ffffff']);
    const [state, setState] = useState({
        token: '',
        deviceId: '',
        loggedIn: false,
        carregando: true,
        musica: {},
        albumUrl: '',
        tempo: {
            pos: 0,
            dur: 0
        }
    });
    const [player, setPlayer] = useState(undefined);
    const playerRef = useRef(player);

    useEffect(() => {
        const { access_token } = getHashParams();
        setState(antigo => ({
            ...antigo,
            token: access_token
        }));
        setTimeout(() => getState(playerRef, setState), 1000);
    }, []);

    useEffect(() => {
        if (state.token !== "" && state.token !== undefined && state.token !== null) {
            setState(antigo => (
                {
                    ...antigo,
                    loggedIn: true
                }
            ));
            setTimeout(() => checkForPlayer(state.token, player, setPlayer, playerRef, state, setState), 1000);
        }
    }, [state.token]);

    useEffect(() => {
        transferPlaybackHere(state);
    }, [state.deviceId]);

    useEffect(() => {
        if(state.musica.album && state.musica.album.images){
            setState(antigo => ({
                ...antigo,
                albumUrl: state.musica.album.images[0].url
            }));
        }
    }, [state.musica]);
    function gerarCores(cores){
        setColors(cores);
    }

    if(state.loggedIn){
        if(!state.carregando){
            return(
                <div className='playerDiv' style={{backgroundImage: `linear-gradient(${colors[0]}, ${colors[1]})`}}>
                    <ColorExtractor src={state.albumUrl} getColors={gerarCores}/>
                    <Pesquisa></Pesquisa>
                    <div className='playerContainer'>
                        <Album albumUrl={state.albumUrl}></Album>
                        <Info musica={state.musica}></Info>
                        <Controller player={player}></Controller>
                        <Progress tempo={state.tempo} player={player}></Progress>
                        <Volume player={player}></Volume>
                    </div>
                    
                </div>
            );
        }else{
            return(
                <div className='loadingDiv'></div>
            );
        }
    }else{
        return(
            <div className='loginDiv'>
                <h1>Reactify</h1>
                <a href="https://reactify-auth.herokuapp.com/login">Login</a>
            </div>
        );
    }
}

export default Player;