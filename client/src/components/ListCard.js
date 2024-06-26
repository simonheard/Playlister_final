import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';
import AuthContext from '../auth'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import SongCard from './SongCard.js'
import SongToolbar from './SongToolbar';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Typography, Button, IconButton, ListItem, TextField, Box, List } from '@mui/material';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const { playlist } = props;
    const [expanded, setExpanded] = useState(false);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const [upvotes, setUpvotes] = useState(playlist.upvotes.length);
    const [downvotes, setDownvotes] = useState(playlist.downvotes.length);
    const [listens, setListens] = useState(playlist.listens);
    const [published, setPublished] = useState(playlist.published);
    //const { idNamePair } = props;
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
        store.expandCurrentList(playlist._id);
        setExpanded(true);
    }
    function handleToggleShrink(event) {
        event.stopPropagation();
        toggleShrink();
    }
    function toggleShrink(){
        if(published){
        store.listen(playlist._id, playlist);
        setListens(listens+1);
        }
        store.closeCurrentList();
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
        //let _id = event.target.id;
        //_id = ("" + _id).substring("delete-list-".length);
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
        cardLable = playlist.name;
    } else {
        cardLable = text;
    }
    if (editActive) {
        cardLable = 
            <TextField
                    margin="normal"
                    required
                    fullWidth
                    id={"list-" + playlist._id}
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

    let owner = playlist.ownerName;
    let time = playlist.createdAt.slice(0,10);
    if(playlist.publishedDate){ time = playlist.publishedDate.slice(0,10);}
    //let listens = playlist.listens;
    // let upvotes = playlist.upvotes;
    // let downvotes = playlist.downvotes;
    console.log(playlist);

    function handleDownvotes(){
        store.downvote();
        setDownvotes(downvotes+1);
    }
    function handleUpvotes(){
        store.upvote();
        setUpvotes(upvotes+1);
    }

    function handleDuplicate(){
        store.duplicate(playlist);
    }
    function handlePublish(){
        store.publish();
        setPublished(true);
    }


    let editButton =
        <Box sx={{ p: 1 }}><IconButton onClick={handleToggleEdit} aria-label='edit'>
            <EditIcon style={{fontSize:'24pt'}} />
        </IconButton></Box>
    let deleteButton = 
        <Box sx={{ p: 1 }}>
            <IconButton onClick={(event) => {
                    handleDeleteList(event, playlist._id)
                }} aria-label='delete'>
                <DeleteIcon style={{fontSize:'24pt'}} />
            </IconButton>
        </Box>
    let songToolbar = <SongToolbar/>
    let publish = <Button variant="contained" onClick={handlePublish} sx={{margin:"auto"}}>Publish</Button>
    let duplicate = <Button variant="contained" onClick={handleDuplicate} sx={{margin:"auto"}}>Duplicate</Button>
    let bgcolor = "lightpink";
    let publishedText = "Published Date: "+time+ " Listens: "+ listens;
    if(!published){
        publishedText = null;
    }
    if(published){
        publish = null;
        bgcolor = "lightyellow";
        editButton = null;
        songToolbar = null;
    }
    let editAndDelete = 
    <Box sx={{display: "flex", flexDirection: "row"}}>
        {editButton}
        {deleteButton}
    </Box>
    if (auth.user.email!==playlist.ownerEmail){
        editAndDelete = null;
        songToolbar = null;
        publish = null;
        bgcolor = "lightblue"
    }
    if(auth.user.email==="guest"){
        duplicate = null;
    }


    let cardElement = 
        <ListItem
            id={playlist._id}
            key={playlist._id}
            sx={{borderRadius:"25px", p: "10px", bgcolor: bgcolor, marginTop: '15px', display: 'flex'}}
            style={{transform:"translate(1%,0%)", width: '98%', fontSize: '24pt' }}
        >
            <Box sx={{display: "flex", flexDirection: "column"}}>
                <Box sx={{display: "flex", flexDirection: "row"}}>
                    <Box sx={{display: "flex", flexDirection: "row"}}>
                        <Box sx={{ p: 1, flexGrow: 1}}><span style={{fontSize:'24pt'}}>{cardLable}</span></Box>
                        {editAndDelete}
                    </Box>
                    <Box sx={{display: "flex", flexDirection: "row"}}>
                        <Box sx={{ p: 2, position: "absolute", right:"16%"}}>
                                <ThumbDownIcon style={{fontSize:'24pt'}} />
                        </Box>
                        <Typography sx={{ p: 1, position: "absolute", right:"11%", fontSize:"24px", top:"15px"}}>{downvotes}</Typography>
                        <Box sx={{ p: 1, position: "absolute", right:"1%"}}>
                            <IconButton onClick={handleToggleExpand} aria-label='expand'>
                                <KeyboardDoubleArrowDownIcon style={{fontSize:'24pt'}} />
                            </IconButton>
                        </Box>
                        <Box sx={{ p: 2, position: "absolute", right:"31%"}}>
                                <ThumbUpIcon style={{fontSize:'24pt'}} />
                        </Box>
                        <Typography sx={{ p: 1, position: "absolute", right:"26%", fontSize:"24px", top:"15px"}}>{upvotes}</Typography>
                    </Box>
                </Box>
                <Box sx={{display: "flex", flexDirection: "row"}}>
                    <span style={{fontSize:'12pt'}}> By: {owner} </span>
                </Box>
                <Box sx={{display: "flex", flexDirection: "row"}}>
                    <span style={{fontSize:'12pt'}}>{publishedText}</span>
                </Box>
            </Box>
        </ListItem>
    if(store.currentList){
    if(expanded && store.currentList._id === playlist._id){
        cardElement = 
        <ListItem
            id={playlist._id}
            key={playlist._id}
            sx={{borderRadius:"25px", p: "10px", bgcolor: bgcolor, marginTop: '15px', display: 'flex'}}
            style={{transform:"translate(1%,0%)", width: '98%', fontSize: '24pt' }}
        >
            <Box sx={{display: "flex", flexDirection: "column", height: '100%', width: '100%'}}>
                <Box sx={{display: "flex", flexDirection: "row"}}>
                    <Box sx={{display: "flex", flexDirection: "row"}}>
                        <Box sx={{ p: 1, flexGrow: 1}}><span style={{fontSize:'24pt'}}>{cardLable}</span></Box>
                        {editAndDelete}
                    </Box>
                    <Box sx={{display: "flex", flexDirection: "row"}}>
                    <Box sx={{ p: 1, position: "absolute", right:"16%"}}>
                            <IconButton onClick={handleDownvotes} aria-label='downvotes'>
                                <ThumbDownIcon style={{fontSize:'24pt'}} />
                            </IconButton>
                        </Box>
                        <Typography sx={{ p: 1, position: "absolute", right:"11%", fontSize:"24px", top:"15px"}}>{downvotes}</Typography>
                        <Box sx={{ p: 1, position: "absolute", right:"1%"}}>
                            <IconButton onClick={handleToggleShrink} aria-label='shrink'>
                                <KeyboardDoubleArrowUpIcon style={{fontSize:'24pt'}} />
                            </IconButton>
                        </Box>
                        <Box sx={{ p: 1, position: "absolute", right:"31%"}}>
                            <IconButton onClick={handleUpvotes} aria-label='upvotes'>
                                <ThumbUpIcon style={{fontSize:'24pt'}} />
                            </IconButton>
                        </Box>
                        <Typography sx={{ p: 1, position: "absolute", right:"26%", fontSize:"24px", top:"15px"}}>{upvotes}</Typography>
                    </Box>
                </Box>
                <Box sx={{display: "flex", flexDirection: "row"}}>
                    <span style={{fontSize:'12pt'}}> By: {owner}</span>
                </Box>
                <Box>
                    <Box sx={{height: '87%', width: '100%'}}>
                        <List sx={{overflowY: 'scroll', maxHeight: '450px', width: '100%', bgcolor: '#d6c4d8'}}>
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
                <Box sx={{display: "flex", flexDirection: "row"}}>
                    {songToolbar}
                    {duplicate}
                    {publish}
                </Box>
                <Box sx={{display: "flex", flexDirection: "row"}}>
                    <span style={{fontSize:'12pt'}}>{publishedText}</span>
                </Box>
            </Box>
            {modalJSX}
        </ListItem>
    }
    }
    if(store.viewPrivate && auth.user.email!==playlist.ownerEmail){
        cardElement = null;
    }
    if(!playlist.published && auth.user.email!==playlist.ownerEmail){
        cardElement = null;
    }
    if(store.searchResult.length>0){
        const inResult = store.searchResult.find(e => {
            if (e===playlist._id) {return true;}
            return false;
        });
        if (inResult === undefined) {
            cardElement=null;
          }
    }
    return (
        cardElement
    );
}

export default ListCard;