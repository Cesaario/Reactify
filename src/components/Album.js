import React from 'react'
import './Album.css'

function Album(props){
    return(
        <>
            <img className='albumImage' src={props.albumUrl} alt='Album'></img>
        </>
    );
}

export default Album;