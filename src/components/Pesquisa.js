import React, {useState, useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

import './Pesquisa.css'

var Spotify = require('spotify-web-api-js');
var s = new Spotify();

function Pesquisa(props){

    const [pesquisa, setPesquisa] = useState('');
    const [musicasPesquisadas, setMusicasPesquisadas] = useState([]);

    useEffect(() => {
        const {token} = props;
        s.setAccessToken(token);
    }, []);

    useEffect(() => {
        pesquisarMusicas();
    }, [pesquisa]);

    const theme = createMuiTheme({
        palette: {
          primary: grey,
        },
    });

    function handleChange(e){
        setPesquisa(e.target.value);
    }

    async function pesquisarMusicas(){
        const pesquisaMusicas = await s.searchTracks(pesquisa);
        console.log(pesquisaMusicas.tracks.items.slice(0, 5))
        setMusicasPesquisadas(pesquisaMusicas.tracks.items.slice(0, 5));
    }

    function tocarMusica(musica){
        setPesquisa('');
        console.log(musica);
    }

    return (
        <ThemeProvider theme={theme}>
            <div className='campoPesquisa'>
                <TextField id="pesquisar" label="Pesquisar" variant="outlined" value={pesquisa} onChange={handleChange}/>
                {
                    pesquisa != '' ? (
                    <ul className='dropDown'>
                        {
                            musicasPesquisadas.map(musica => (
                                <li key={musica.id}>
                                    <div className='itemPesquisa' onClick={() => tocarMusica(musica.uri)}>
                                        <img src={musica.album.images[2].url}></img>
                                        <div className='textoItemPesquisa'>
                                            <span>{musica.name}</span>
                                            <span>{musica.artists[0].name}</span>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                    ) : (<></>)
                }
            </div>
        </ThemeProvider>
    );
}

export default Pesquisa;