import React from 'react'
import TextField from '@material-ui/core/TextField';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

import './Pesquisa.css'

function Pesquisa(){

    const theme = createMuiTheme({
        palette: {
          primary: grey,
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <div className='campoPesquisa'>
                <TextField id="pesquisar" label="Pesquisar" variant="outlined"/>
            </div>
        </ThemeProvider>
    );
}

export default Pesquisa;