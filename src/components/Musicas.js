import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import IconButton from '@material-ui/core/IconButton'; 

import './Musicas.css'

function Musicas(){

    const [dialogoMusicas, setDialogoMusicas] = useState(false);

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
                    <div className='itemMusica'>
                            <IconButton>
                                <PlayCircleFilledIcon style={{ fontSize: 40, fill: '#dddddd'}}></PlayCircleFilledIcon>
                            </IconButton>
                            <span>Reapers - Muse</span>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );

}

export default Musicas;