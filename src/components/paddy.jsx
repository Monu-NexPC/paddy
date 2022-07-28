import { List, ListItem, ListItemText } from '@mui/material';
//import IconButton from '@mui/material/IconButton'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import db from '../firbase';

import AddData from './adddata';

import BasicTabs from './Tabs';
function Paddy({network}) {
    const loggedStatus = useSelector(e=>e.user.status);
    const user = useSelector(e=>e.user.user);
    const cat = useSelector(e=>e.user.category);
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]); 
    const getAllNotes =async ()=>{
        const q = query(collection(db,"notepad"), where("username", "==", user), orderBy("createdOn", "desc"));
        const querySnapshot = await getDocs(q);
        setNotes(querySnapshot.docs.map(e => [e.id,e.data()]))
        //window.localStorage.setItem("offline", JSON.stringify(querySnapshot.docs.map(e => [e.id,e.data()])))

    }
    
    useEffect(()=>{
        getAllNotes();
        if(!loggedStatus){navigate('/')}
        if(!network){
          navigate('/offline');
          //toast.warn('You Are Offline, But Read Last Paddy');
          //setNotes(JSON.parse(window.localStorage.getItem('offline')))
      }
    },[loggedStatus,network]);
  return (
    <div>
      <BasicTabs notes={notes} cats={cat} getAllNotes={getAllNotes}  style={{marginBottom: '75px', maxHeight: '75vh'}}/>
        
        <AddData user={user} notes={notes} getAllNotes={getAllNotes}/>
    </div>
  )
}

export default Paddy;