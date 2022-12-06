import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import PlayerWrapper from './PlayerWrapper'
import List from '@mui/material/List';
import Box from '@mui/material/Box'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        //store.loadIdNamePairs();
        store.loadPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{width: '100%', bgcolor: 'background.paper', mb:"20px" }}>
            {
                // store.idNamePairs.map((pair) => (
                //     <ListCard
                //         key={pair._id}
                //         idNamePair={pair}
                //         selected={false}
                //     />
                // ))
                store.playlists.map((list) => (
                    <ListCard
                        key={list._id}
                        playlist={list}
                        />
                ))
                
            }
            </List>;
    }
    return (
        <div id="home-screen">
            <Box sx={{ bgcolor:"background.paper"}} id="list-selector-list">
                {
                    listCard
                }
                <MUIDeleteModal />
            </Box>
            <div id="player-wrapper">
                <PlayerWrapper/>
            </div>
        </div>
        
        )
}

export default HomeScreen;