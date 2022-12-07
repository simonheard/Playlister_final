import { useContext } from 'react'
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/

function Statusbar() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    function handleCreateNewList() {
        store.createNewList();
    }
    let button = 
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}>
                <AddIcon />
            </Fab>

    let text ="";
    if (auth.loggedIn){
        if(store.currentList){
            text = store.currentList.name;
            return (
                <div id="playlister-statusbar">
                    {text}
                </div>
            );
        }
        return(
            <div id="playlister-statusbar">
                {button}
                Your lists
            </div>
        );
    }
    return null;

}

export default Statusbar;