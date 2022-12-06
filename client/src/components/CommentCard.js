import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

function ListCard(props) {
    const { auther, content } = props;
    return (
        <Box sx={{display: "flex", flexDirection: "column"}}>
            <Typography>{auther}:</Typography>
            <Typography fontSize='24px'>{content}</Typography>
        </Box>
    );
}

export default ListCard;