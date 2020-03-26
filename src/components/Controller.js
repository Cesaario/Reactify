import React, {useState} from 'react'
import IconButton from '@material-ui/core/IconButton';  
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import './Controller.css'

function Controller(props){

    const {player, pausado} = props;

    function alternarMusica(){
        player.togglePlay();
    }

    function proximaMusica(){
        player.nextTrack();
    }

    function musicaAnterior(){
        player.previousTrack();
    }

    return(
        <div className='controllerDiv'>
            <IconButton onClick={musicaAnterior}>
                <SkipPreviousIcon style={{ fontSize: 40, fill: '#dddddd'}}></SkipPreviousIcon>
            </IconButton>
            <IconButton onClick={alternarMusica}>
                {
                    !pausado ?
                    <PauseCircleFilledIcon style={{ fontSize: 40, fill: '#dddddd'}}></PauseCircleFilledIcon>
                    :
                    <PlayCircleFilledIcon style={{ fontSize: 40, fill: '#dddddd'}}></PlayCircleFilledIcon>
                }
            </IconButton>
            <IconButton onClick={proximaMusica}>
                <SkipNextIcon style={{ fontSize: 40, fill: '#dddddd'}}></SkipNextIcon>
            </IconButton>
        </div>
    );
}

export default Controller;