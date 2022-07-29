import { Box, Container, IconButton, Modal, Typography,Fab, Icon, Divider } from "@mui/material"
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';

import { doc, deleteDoc } from "firebase/firestore";
import db from "../firbase";

import { pink } from "@mui/material/colors";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Del({id, getAllNotes}) {
    const [open, setOpen] = useState(false)
    const del = async ()=>{
         await deleteDoc(doc(db, "notepad", id));
         toast.error('Deleted !', {autoClose: 2000})
        getAllNotes()
    }
  return (
    <>
    <IconButton edge="end" aria-label="delete" onClick={()=>setOpen(true)}>
        <DeleteIcon sx={{ color: pink[300] }}/>
    </IconButton>
    <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Container fixed className='mx-auto my-1 col-11'>
            <Typography id="modal-modal-title" variant="h5" component="div" className='border-bottom'>
                Are You Sure ?
            </Typography>
            <Divider/>
            <Fab color="success" aria-label="add" onClick={()=>setOpen(false)} className="m-2">
                <Icon>warning</Icon>
            </Fab>
            <Fab color="warning" aria-label="add" onClick={del} className="mx-2">
                <Icon>delete</Icon>
            </Fab>
        </Container>
        </Box>
      </Modal>
    </>
  )
}

export const Copy = ({data}) =>{
    const copy = ()=>{
        navigator.clipboard.writeText(data);
        toast.success("Copied", {autoClose: 2000});
    }
    return(
        <IconButton sx={{ fontSize: 20 }} edge="start" aria-label="copy" onClick={copy}>
            <FileCopyIcon color="primary"/>
        </IconButton>
    )
}


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 360,
    bgcolor: 'background.paper',
    border: '2px dotted #1976D2',
    boxShadow: 24,
    p: 4,
  };