import image from "./logo.png"
import { Box, Typography, Button, Stack } from "@mui/material"
import { useContext, useState } from 'react';
import AuthContext from "../auth"
export default function SplashScreen() {
    const { auth } = useContext(AuthContext);
    function handleGuest(){
        auth.registerUser("Guest", "Account", "guest", "guestpass", "guestpass");
        auth.loginUser("guest","guestpass");
    }
    return (
        <Box id="splash-screen" sx={{display: "flex", flexDirection: "column"}}>
            <Box margin='auto' sx={{height:"40%", width:"40%"}} ><img alt="logo" src={image}/></Box>
            <Typography fontSize='48pt'>Welcome to Playlister!</Typography>
            <Typography fontSize='24pt'>Simply An YouTube Music Player.</Typography>
            <Typography>Credit to Simon Wang</Typography>
            <Box margin='auto' sx={{display: "flex", flexDirection: "row"}}>
                <Stack spacing={4} direction="row">
                    <Button variant="contained" href='/register/'>Create Account</Button>
                    <Button variant="contained" href='/login/'>Login</Button>
                    <Button variant="contained" onClick={handleGuest}>Continue as Guest</Button>
                </Stack>
            </Box>
        </Box>
    )
}