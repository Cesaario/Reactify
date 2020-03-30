import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import IconButton from '@material-ui/core/IconButton'; 

import './Musicas.css'

function Musicas(){

    const [dialogoMusicas, setDialogoMusicas] = useState(false);
    const [minhasMusicas, setMinhasMusica] = useState([]);

    useEffect(() => {
        
    }, []);

    return(
        <div className='containerMusica'>
            <Button className='botao' onClick={ () => { setDialogoMusicas(true) }}>Minhas Musicas</Button>
            <Dialog hideBackdrop PaperProps={{style: {backgroundColor: 'transparent', boxShadow: 'none', minWidth: '80vw'}}} 
                    open={dialogoMusicas} 
                    onClose={ () => {setDialogoMusicas(false)} }>
                <div className='conteudoDialogo'>
                    <div className='containerTitulo'>
                        <h1 className='tituloDialogo'>Minhas músicas</h1>
                    </div>
                    <div className='containerMusicas'>
                        {/*<div className='itemMusica'>
                            <IconButton>
                                <PlayCircleFilledIcon style={{ fontSize: 40, fill: '#dddddd'}}></PlayCircleFilledIcon>
                            </IconButton>
                            <span>Reapers - Muse</span>
                        </div>*/}
                        <table className='tabelaMusicas'>
                            <tr>
                                <th></th>
                                <th>Nome</th>
                                <th>Artista</th>
                                <th>Álbum</th>
                                <th>Duração</th>
                            </tr>
                            <tr>
                                <td className='botao'>
                                    <IconButton>
                                        <PlayCircleFilledIcon style={{ fontSize: 40, fill: '#dddddd'}}></PlayCircleFilledIcon>
                                    </IconButton>
                                </td>
                                <td>Reapers</td>
                                <td>Muse</td>
                                <td>Drones</td>
                                <td>6:00</td>
                            </tr>
                            <tr>
                                <td className='botao'>
                                    <IconButton>
                                        <PlayCircleFilledIcon style={{ fontSize: 40, fill: '#dddddd'}}></PlayCircleFilledIcon>
                                    </IconButton>
                                </td>
                                <td>Reapers</td>
                                <td>Muse</td>
                                <td>Drones</td>
                                <td>6:00</td>
                            </tr>
                            <tr>
                                <td className='botao'>
                                    <IconButton>
                                        <PlayCircleFilledIcon style={{ fontSize: 40, fill: '#dddddd'}}></PlayCircleFilledIcon>
                                    </IconButton>
                                </td>
                                <td>Reapers</td>
                                <td>Muse</td>
                                <td>Drones</td>
                                <td>6:00</td>
                            </tr>
                            <tr>
                                <td className='botao'>
                                    <IconButton>
                                        <PlayCircleFilledIcon style={{ fontSize: 40, fill: '#dddddd'}}></PlayCircleFilledIcon>
                                    </IconButton>
                                </td>
                                <td>Reapers</td>
                                <td>Muse</td>
                                <td>Drones</td>
                                <td>6:00</td>
                            </tr>
                            <tr>
                                <td className='botao'>
                                    <IconButton>
                                        <PlayCircleFilledIcon style={{ fontSize: 40, fill: '#dddddd'}}></PlayCircleFilledIcon>
                                    </IconButton>
                                </td>
                                <td>Reapers</td>
                                <td>Muse</td>
                                <td>Drones</td>
                                <td>6:00</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </Dialog>
        </div>
    );

}

export default Musicas;