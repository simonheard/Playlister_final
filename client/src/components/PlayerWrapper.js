import * as React from 'react';
import { Tabs, Tab, Box, Typography} from '@mui/material';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';
import AuthContext from '../auth';
import Comments from "./Comments";
import Player from "./Player";
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  export default function PlayerWrapper() {
    const [value, setValue] = React.useState(0);
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    let comments=null;
    let player=null;
    if(store.currentList){
        comments=<Comments/>
        if(store.currentList.songs.length>0){
            player = <Player/>
        }else{
            player = <Typography fontSize="48pt" fontWeight="bold">There are no song in this playlist.</Typography>
        }
    }else{
        comments=null;
        player=null;
    }
  
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Player" {...a11yProps(0)} />
            <Tab label="Comments" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {player}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {comments}
        </TabPanel>
      </Box>
    );
  }