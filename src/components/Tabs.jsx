import React ,{useEffect} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { List, ListItem, ListItemText } from '@mui/material';
import Del, { Copy } from './deldata';


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
        <Box sx={{ p: 1 }}>
          <Typography component={'span'} variant={'body2'}>{children}</Typography>
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
let arr = [];
export default function BasicTabs({cats, notes, getAllNotes}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
    for (let index = 0; index < cats.length; index++) {
        arr[index]= notes.filter(a=> a[1].category == cats[index]);
      }
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} 
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example">
            {cats.map((e,i)=>
                <Tab key={i} label={e === ''?'default':e} {...a11yProps(i)} />
            )}
        </Tabs>
      </Box>
      {arr.map((a,i)=>(
        <TabPanel key={i} value={value} index={i}>
            <List>
                {a.map((e)=>
                <ListItem key={e[0]} secondaryAction={ <Del id={e[0]} getAllNotes={getAllNotes}/> }>
                    <Copy data={e[1].data}/>
                    <ListItemText className='text-break' primary={e[1].data}/>
                </ListItem>
                )}
            </List>
        </TabPanel>
        ))}
    </Box>
  );
}
