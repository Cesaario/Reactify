import React, {useEffect, useState} from 'react'
import './Info.css'

function Info(props){

    const [artista, setArtista] = useState('');

    useEffect(() => {
        if(props.musica.artists) setArtista(props.musica.artists[0].name);
    }, [props.musica]);

    return(
        <div className='infoContainer'>
            {
                props.musica && 
                <>
                    <h2 className='infoNome'>{props.musica.name}</h2> 
                    <h3 className='infoArtista'>{artista}</h3>  
                </>
            }
        </div>
    );
}

export default Info;