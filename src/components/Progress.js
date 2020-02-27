import React, {useEffect, useState} from 'react'
import Slider from '@material-ui/core/Slider';

import './Progress.css'

function Progress(props){

    const [progresso, setProgresso] = useState(50);
    const [atual, setAtual] = useState('0:00');
    const [final, setFinal] = useState('0:00');


    useEffect(() => {
        let posSegundos = parseInt(props.tempo.pos/1000);
        let durSegundos = parseInt(props.tempo.dur/1000);
        let zeroPos = posSegundos%60 < 10 ? '0' : '';
        let zeroDur = durSegundos%60 < 10 ? '0' : '';
        setAtual(`${parseInt(posSegundos/60)}:${zeroPos}${parseInt(posSegundos%60)}`);
        setFinal(`${parseInt(durSegundos/60)}:${zeroDur}${parseInt(durSegundos%60)}`);
        setProgresso(props.tempo.pos / props.tempo.dur * 100);
    }, [props.tempo]);

    return(
        <div className='progressDiv'>
            <h5 className='tempo'>{atual}</h5>
            <Slider disabled value={progresso} aria-labelledby="continuous-slider" />
            <h5 className='tempo'>{final}</h5>
        </div>
    );
}

export default Progress;