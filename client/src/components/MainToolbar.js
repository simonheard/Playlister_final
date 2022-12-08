import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import { IconButton, Box, TextField, Typography, Menu, MenuItem } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import SortIcon from '@mui/icons-material/Sort';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function MainToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);
    const [anchorE1, setAnchorEl] = useState(null);
    const [text, setText]=useState("");
    const isMenuOpen = Boolean(anchorE1);
    
    const handleSortMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleMenuClose = () => {
        setAnchorEl(null);
    }
    function handleSortByName(){
        store.sortListByName();
        handleMenuClose();
    }
    function handleSortByDate(){
        store.sortListByDate();
        handleMenuClose();
    }
    function handleSortByListen(){
        store.sortListByListens();
        handleMenuClose();
    }
    function handleSortByLike(){
        store.sortListByLikes();
        handleMenuClose();
    }
    function handleSortByDislike(){
        store.sortListByDislikes();
        handleMenuClose();
    }
    const menuId = 'sort-list-menu';
    const sortListMenu = 
        <Menu
            anchorEl={anchorE1}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleSortByName}>Name (A-Z a-z)</MenuItem>
            <MenuItem onClick={handleSortByDate}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={handleSortByListen}>Listens (High-Low)</MenuItem>
            <MenuItem onClick={handleSortByLike}>Likes (High-Low)</MenuItem>
            <MenuItem onClick={handleSortByDislike}>Dislikes (High-Low)</MenuItem>
        </Menu>
    

    function handleHome() {
        handlePublic();
    }
    function handlePublic() {
        if(store.viewPrivate){
            store.toggleViewPrivate();
        }
    }
    function handlePrivate() {
        if(!store.viewPrivate){
            store.toggleViewPrivate();
        }
    }
    function handleChange(event){
        setText(event.target.value);
    }
    function handleSearch(event){
        if(event.code === "Enter"){
            //store.loadPlaylists();
            store.searchListOrUser(text);
        }
    }

    if(!auth.loggedIn){
        return (null);
    }

    return (
        <Box id='main-toolbar' sx={{display: "flex", flexDirection: "row"}}>
            <Box sx={{  }}><IconButton onClick={handleHome} aria-label='home'>
                <HomeIcon style={{fontSize:'24pt'}} />
            </IconButton></Box>
            <Box sx={{  }}><IconButton onClick={handlePublic} aria-label='public'>
                <GroupsIcon style={{fontSize:'24pt'}} />
            </IconButton></Box>
            <Box sx={{  }}><IconButton onClick={handlePrivate} aria-label='private'>
                <PersonIcon style={{fontSize:'24pt'}} />
            </IconButton></Box>
            <TextField id="search-field" label="Search" variant = "filled" sx={{ position: "absolute", left:"24%", width:"35%"}} onChange={handleChange} onKeyPress={handleSearch}/>
            <Typography sx= {{position: "absolute", top:"5px",right:"4%", fontSize:"24px", fontWeight:"bold", color:"gray"}}> Sort By </Typography>
            <Box sx={{ position: "absolute", right:"1%" }}><IconButton onClick={handleSortMenuOpen} aria-label='sort'>
                <SortIcon style={{fontSize:'24pt'}} />
            </IconButton></Box>
            {sortListMenu}
        </Box>
    )
}

export default MainToolbar;