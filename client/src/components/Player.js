import { useContext, useState } from 'react';
import React from 'react';
import YouTube from 'react-youtube';
import GlobalStoreContext from "../store";
import {Box, Typography, IconButton} from "@mui/material/"
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

export default function Player() {
    const { store } = useContext(GlobalStoreContext);
    let playlist = store.currentList.songs;
    let currentSong = 0;
    let playListName = store.currentList.name;
    const [songId, setSongId] = useState(currentSong+1);
    const [title, setTitle] = useState(playlist[currentSong].title);
    const [artist, setArtist] = useState(playlist[currentSong].artist);
    //let currentSongTitle = playlist[currentSong].title;
    //let currentSongArtist = playlist[currentSong].artist;
    const playerOptions = {
        height: '350',
        width: '560',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    function loadAndPlayCurrentSong(player) {
        let song = playlist[currentSong].youTubeId;
        player.loadVideoById(song);
        player.playVideo();
    }
    function incSong() {
        currentSong++;
        currentSong = currentSong % playlist.length;
        setSongId(currentSong+1);
        setTitle(playlist[currentSong].title);
        setArtist(playlist[currentSong].artist);
    }
    function decSong() {
        currentSong--;
        if (currentSong === -1){currentSong=playlist.length-1}
        setSongId(currentSong+1);
        setTitle(playlist[currentSong].title);
        setArtist(playlist[currentSong].artist);
    }
    function onPlayerReady(event) {
        let player = event.target;
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
        document.getElementById('ctrl-stop').onclick = function(){player.stopVideo()}
        document.getElementById('ctrl-play').onclick = function(){player.playVideo()}
        document.getElementById('ctrl-pause').onclick = function(){player.pauseVideo()}
        document.getElementById('ctrl-next').onclick = function(){
            incSong();
            loadAndPlayCurrentSong(player);
        }
        document.getElementById('ctrl-previous').onclick = function(){
            decSong();
            loadAndPlayCurrentSong(player);
        }
    }
    function onPlayerStateChange(event) {
        console.log(event)
        let playerStatus = event.data;
        let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
    }

    function handlePrevious(){

    }
    function handleNext(){
        
    }
    function handleStop(){

    }
    function handlePlay(){
        
    }
    return(
        <Box sx={{display: "flex", flexDirection: "column"}}>
            <YouTube
                videoId={playlist[currentSong]}
                opts={playerOptions}
                onReady={onPlayerReady}
                onStateChange={onPlayerStateChange} />
            <Box id="info-box" sx={{borderRadius:"25px", p: "10px", bgcolor: '#F8F0FE', marginTop: '15px',display: "flex", flexDirection: "column"}}>
                <Typography>Now Playing</Typography>
                <Typography>Playlist: {playListName}</Typography>
                <Typography>Song #:   {songId}</Typography>
                <Typography>Title:    {title}</Typography>
                <Typography>Artist:   {artist}</Typography>
                <Box id="controls-bar" sx={{borderRadius:"25px", bgcolor: 'white',display: "flex", flexDirection: "row"}}>
                    <Box sx={{margin:"auto", display: "flex"}}>
                        <Box sx={{ p: 1 }}><IconButton id='ctrl-previous' onClick={handlePrevious} aria-label='previous'>
                            <SkipPreviousIcon style={{fontSize:'24pt'}} />
                        </IconButton></Box>
                        <Box sx={{ p: 1 }}><IconButton id='ctrl-stop' onClick={handleStop} aria-label='stop'>
                            <StopIcon style={{fontSize:'24pt'}} />
                        </IconButton></Box>
                        <Box sx={{ p: 1 }}><IconButton id='ctrl-pause' aria-label='play'>
                            <PauseIcon style={{fontSize:'24pt'}} />
                        </IconButton></Box>
                        <Box sx={{ p: 1 }}><IconButton id='ctrl-play' onClick={handlePlay} aria-label='play'>
                            <PlayArrowIcon style={{fontSize:'24pt'}} />
                        </IconButton></Box>
                        <Box sx={{ p: 1 }}><IconButton id='ctrl-next' onClick={handleNext} aria-label='next'>
                            <SkipNextIcon style={{fontSize:'24pt'}} />
                        </IconButton></Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}