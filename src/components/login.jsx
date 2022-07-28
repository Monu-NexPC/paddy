import { Button, Icon, Modal, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { collection, query, where, getDocs } from "firebase/firestore";
import db from '../firbase'
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { logIN } from '../redux/reducers/users';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function Login({network, font}) {
  const loggedStatus = useSelector(e=>e.user.status);
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const [open, setOpen] = useState(false);
  const LogIn= async ()=>{
      
    const q = query(collection(db, "users"), where("userName", "==", document.getElementById('outlined-basic').value.toLowerCase()));
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.map(e => e.data()).length !== 0? dispatch(logIN(querySnapshot.docs.map(e => e.id))):toast.warn('Wrong UserName');
  }
  useEffect(()=>{
    if(loggedStatus){
      navigate('/home');
    }
    if(!network){navigate('/offline')}
  }, [loggedStatus,network]);


  return (
    <>
    
    <Box
        className="col-12 col-lg-6 d-flex flex-column justify-content-center mx-auto"
      component="form"
      sx={{
        '& > :not(style)': { m: 1, maxWidth: '90%' },
      }}
      noValidate
      autoComplete="off"
    >
        <Typography variant="h5" component="h5" align='center' className='open-sans mt-4' style={{fontFamily: font.nunito}}>Log In To Paddy</Typography>
      <TextField className="col-11 mx-auto" id="outlined-basic" label="Enter Only UserName" variant="outlined" />
      <Button className="my-1 col-11 mx-auto mb-5" variant="outlined" onClick={LogIn}>Let's Go</Button>
      <ToastContainer position="top-right" />

      <Button onClick={()=>setOpen(true)} variant="contained" className='col-8 col-md-6 col-lg-4 mx-auto mt-5 open-sans' startIcon={<Icon>info</Icon>}>About Paddy</Button>
    </Box>
    
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" className='border-bottom'>
            A little About PADDY
          </Typography>
          <Typography id="modal-modal-description" className='fw-semibold nunito' sx={{ mt: 2 }} style={{fontFamily: font.openSans}}>
          An Online Notepad For use To Copy All important notes. Specialy Design For Developer So Do not need to copy data on Every Devices. Chats are For Chatting Not For Copy and pasting. Try Today Paddy , Your Perfect Development Parnter.
          </Typography>
        </Box>
      </Modal>
    </>
  );
}


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 370,
  bgcolor: 'background.paper',
  border: '2px dotted #1976D2',
  boxShadow: 24,
  p: 4,
};
