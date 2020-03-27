import React, {useState, useEffect} from 'react';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import './Volume.css'

const muiTheme = createMuiTheme({
    overrides: {
        MuiSlider: {
            thumb: {
                color: "#ffffff",
            },
            track: {
                color: '#888888'
            },
            rail: {
                color: '#dddddd'
            }
        }
    }
});

function Volume(props){

    const [volume, setVolume] = useState(50);

    useEffect(() => {
        setInterval(getVolume, 1000);
        const { player } = props;
        player.setVolume(0.5);
    }, []);

    function handleChange(event, val){
        setVolume(val);
        const { player } = props;
        player.setVolume(val * 0.01);
    }

    async function getVolume(){
        const { player } = props;
        const volume = await player.getVolume();
        setVolume(volume * 100);
    }

    return(
        <div className='containerVolume'>
            <VolumeDown style={{ fill: '#dddddd'}}/>
            <ThemeProvider theme={muiTheme}>
                <Slider value={volume} onChange={handleChange} className='slider'/>
            </ThemeProvider>
            <VolumeUp style={{ fill: '#dddddd'}}/>
        </div>
    );
}

export default Volume;
