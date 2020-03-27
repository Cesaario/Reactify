import React, { useState } from 'react'
import Button from '@material-ui/core/Button';

import './Playlists.css'

function Playlists(){

    const [dialogoPlaylists, setDialogoPlaylists] = useState(false);

    return(
        <div className='containerPlaylists'>
            <Button className='botao'>Playlists</Button>
        </div>
    );

}

export default Playlists;