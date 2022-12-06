import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import SongCard from './SongCard.js'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import SongToolbar from './SongToolbar';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [expanded, setExpanded] = useState(false);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair } = props;

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    function handleToggleExpand(event) {
        event.stopPropagation();
        toggleExpand();
    }
    function toggleExpand(){
        store.setCurrentList(idNamePair._id);
        console.log("EXPAND");
        setExpanded(true);
    }

    function handleToggleShrink(event) {
        event.stopPropagation();
        toggleShrink();
    }
    function toggleShrink(){
        store.closeCurrentList();
        console.log("SHRINK");
        setExpanded(false);
    }

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }
    
    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }
    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }
    let cardLable = "";
    if (!text){
        cardLable = idNamePair.name;
    } else {
        cardLable = text;
    }
    if (editActive) {
        cardLable = 
            <TextField
                    margin="normal"
                    required
                    fullWidth
                    id={"list-" + idNamePair._id}
                    label="Playlist Name"
                    name="name"
                    autoComplete="Playlist Name"
                    className='list-card'
                    onKeyPress={handleKeyPress}
                    onChange={handleUpdateText}
                    defaultValue={cardLable}
                    inputProps={{style: {fontSize: 24}}}
                    InputLabelProps={{style: {fontSize: 24}}}
                    autoFocus
            />
    }

    let cardElement = 
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{borderRadius:"25px", p: "10px", bgcolor: '#8000F00F', marginTop: '15px', display: 'flex', p: 1 }}
            style={{transform:"translate(1%,0%)", width: '98%', fontSize: '24pt' }}
        >
            <Box sx={{display: "flex", flexDirection: "column"}}>
                <Box sx={{display: "flex", flexDirection: "row"}}>
                    <Box sx={{display: "flex", flexDirection: "row"}}>
                        <Box sx={{ p: 1, flexGrow: 1}}><span style={{fontSize:'24pt'}}>{cardLable}</span></Box>
                        <Box sx={{ p: 1 }}><IconButton onClick={handleToggleEdit} aria-label='edit'>
                        <EditIcon style={{fontSize:'24pt'}} />
                        </IconButton></Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={(event) => {
                                    handleDeleteList(event, idNamePair._id)
                                }} aria-label='delete'>
                                <DeleteIcon style={{fontSize:'24pt'}} />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box sx={{ p: 1, position: "absolute", right:"15px"}}>
                        <IconButton onClick={handleToggleExpand} aria-label='expand'>
                            <KeyboardDoubleArrowDownIcon style={{fontSize:'24pt'}} />
                        </IconButton>
                    </Box>
                </Box>
                <Box sx={{display: "flex", flexDirection: "row"}}>
                    <span style={{fontSize:'12pt'}}> By </span>
                </Box>
                <Box sx={{display: "flex", flexDirection: "row"}}>
                    <span style={{fontSize:'12pt'}}>Published:   Listens:</span>
                </Box>
            </Box>
        </ListItem>
    if(store.currentList){
    if(expanded && store.currentList._id === idNamePair._id){
        cardElement = 
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{borderRadius:"25px", p: "10px", bgcolor: '#F8F0FE', marginTop: '15px', display: 'flex', p: 1 }}
            style={{transform:"translate(1%,0%)", width: '98%', fontSize: '24pt' }}
        >
            <Box sx={{display: "flex", flexDirection: "column", height: '100%', width: '100%'}}>
                <Box sx={{display: "flex", flexDirection: "row"}}>
                    <Box sx={{display: "flex", flexDirection: "row"}}>
                        <Box sx={{ p: 1, flexGrow: 1}}><span style={{fontSize:'24pt'}}>{cardLable}</span></Box>
                        <Box sx={{ p: 1 }}><IconButton onClick={handleToggleEdit} aria-label='edit'>
                        <EditIcon style={{fontSize:'24pt'}} />
                        </IconButton></Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={(event) => {
                                    handleDeleteList(event, idNamePair._id)
                                }} aria-label='delete'>
                                <DeleteIcon style={{fontSize:'24pt'}} />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box sx={{ p: 1, position: "absolute", right:"15px"}}>
                        <IconButton onClick={handleToggleShrink} aria-label='shrink'>
                            <KeyboardDoubleArrowUpIcon style={{fontSize:'24pt'}} />
                        </IconButton>
                    </Box>
                </Box>
                <Box sx={{display: "flex", flexDirection: "row"}}>
                    <span style={{fontSize:'12pt'}}> By </span>
                </Box>
                <Box>
                    <Box sx={{height: '87%', width: '100%'}}>
                        <List sx={{overflow: 'scroll', maxHeight: '500px', width: '100%', bgcolor: '#d6c4d8'}}>
                            {
                                store.currentList.songs.map((song, index) => (
                                    <SongCard
                                        id={'playlist-song-' + (index)}
                                        key={'playlist-song-' + (index)}
                                        index={index}
                                        song={song}
                                    />
                                ))  
                            }
                        </List>
                    </Box>
                </Box>
                <Box>
                    <SongToolbar/>
                </Box>
                <Box sx={{display: "flex", flexDirection: "row"}}>
                    <span style={{fontSize:'12pt'}}>Published:   Listens:</span>
                </Box>
            </Box>
            {modalJSX}
        </ListItem>
    }
    }
    return (
        cardElement
    );
}

export default ListCard;