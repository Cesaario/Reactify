function createEventHandlers(player, state, setState) {
    player.on('initialization_error', e => { console.error(e); });
    player.on('authentication_error', e => {
        console.error(e);
        console.log('erro de autenticação');
        //setState({ ...state, loggedIn: false });
    });
    player.on('account_error', e => { console.error(e); });
    player.on('playback_error', e => { console.error(e); });

    // Playback status updates
    player.on('player_state_changed', estado => { onStateChanged(estado, setState); });

    // Ready
    player.on('ready', async data => {
        let { device_id } = data;
        console.log("Pronto!");
        console.log(state);
        //setState({ ...state, deviceId: device_id});
        setState(antigo => (
            {
                ...antigo,
                deviceId: device_id,
                carregando: false
            }
        ));
    });
}

function onStateChanged(estado, setState) {
    if (estado != null) {
        const { current_track } = estado.track_window;
        setState(antigo => ({
            ...antigo,
            musica: current_track
        }));
        //setState({ ...state, trackName: current_track.name });
    }
}

function getState(playerRef, setState){
    if(playerRef.current){
        playerRef.current.getCurrentState().then(estado => {
            if (!estado) {
              //console.error('User is not playing music through the Web Playback SDK');
              return;
            }
            setState(antigo => ({
                ...antigo,
                tempo: {
                    pos: estado.position,
                    dur: estado.duration
                }
            }));
            /*setTempo({
                pos: estado.position,
                dur: estado.duration
            })*/
          });
    }
    setTimeout(() => getState(playerRef, setState), 1000);
}

function checkForPlayer(authToken, player, setPlayer, playerRef, state, setState) {
    if (window.Spotify !== null) {
        const player = new window.Spotify.Player({
            name: "Reactify",
            getOAuthToken: cb => {
                cb(authToken);
            }
        });
        createEventHandlers(player, state, setState);
        console.log("Conectado");
        player.connect();
        setPlayer(player);
        playerRef.current = player;
    } else {
        setTimeout(checkForPlayer, 1000, authToken);
    }
}

function transferPlaybackHere(state) {
    const { deviceId, token } = state;
    fetch("https://api.spotify.com/v1/me/player", {
        method: "PUT",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "device_ids": [deviceId],
            "play": false,
        }),
    });
}

function getHashParams() {
    const url = new URL(window.location.href);
    const tokens = {
        access_token: url.searchParams.get('access_token'),
        refresh_token: url.searchParams.get('refresh_token')
    };
    return tokens;
}

exports.createEventHandlers = createEventHandlers;
exports.getState = getState;
exports.checkForPlayer = checkForPlayer;
exports.transferPlaybackHere = transferPlaybackHere;
exports.getHashParams = getHashParams;