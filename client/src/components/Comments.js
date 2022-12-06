import React, { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';
import List from '@mui/material/List';
import CommentCard from './CommentCard';
import {Box, TextField} from '@mui/material/';

function Comments(props) {
    const { store } = useContext(GlobalStoreContext);
    const [text, setText] = useState("");
    // function handleClick(event) {
    //     // DOUBLE CLICK IS FOR SONG EDITING
    //     if (event.detail === 2) {
    //         console.log("double clicked");
    //         store.showEditSongModal(index, song);
    //     }
    // }
    function handleChange(event){
        setText(event.target.value);
        console.log(text);
    }
    function handleNewComment(event) {
        if (event.code === "Enter") {
            store.addNewComment(text);
        }
    }

    let commentCard = "";
    if (store) {
        commentCard = 
            <List  sx={{overflowY: 'scroll', borderRadius:"25px", p: "10px", bgcolor: '#8000F00F', marginTop: '15px', maxHeight: "100%"}}>
            {
                store.currentList.comments.map((comment)=> (
                    <CommentCard 
                        auther={comment.auther}
                        content={comment.content}
                        />
                ))  
            }
            </List>;
    }
    return (
        <Box sx={{display: "flex", flexDirection: "column"}}>
            <Box sx={{height:'470px'}}> {commentCard}</Box>
            <Box sx={{position:'absolute', bottom: '1%', width:"92%"}}>
                <TextField id="comment-field" label="Add New Comment" variant = "filled" sx={{width:"100%"}} onChange={handleChange} onKeyPress={handleNewComment}/>
            </Box>
        </Box>
    );
}

export default Comments;