import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { IconButton, Box, TextField, Typography } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import SortIcon from '@mui/icons-material/Sort';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import CloseIcon from '@mui/icons-material/HighlightOff';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function MainToolbar() {
    const { store } = useContext(GlobalStoreContext);

    function handleHome() {
        console.log("HOME")
    }
    function handlePublic() {
        console.log("Public")
    }
    function handlePrivate() {
        console.log("Private")
    }
    function handleSort() {
        console.log("Sort")
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
            <TextField id="search-field" label="Search" variant = "filled" sx={{ position: "absolute", left:"24%", width:"35%"}}/>
            <Typography sx= {{position: "absolute", top:"5px",right:"4%", fontSize:"24px", fontWeight:"bold", color:"gray"}}> Sort By </Typography>
            <Box sx={{ position: "absolute", right:"1%" }}><IconButton onClick={handleSort} aria-label='sort'>
                <SortIcon style={{fontSize:'24pt'}} />
            </IconButton></Box>
        </Box>
    )
}

export default MainToolbar;