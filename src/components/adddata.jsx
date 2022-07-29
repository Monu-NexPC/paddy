import { Box, Button, Container, Fab, Icon, Modal, TextField, Typography } from '@mui/material'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import React, {useEffect, useState} from 'react'
import db from '../firbase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import{useDispatch, useSelector}from 'react-redux'
import { allCategory } from '../redux/reducers/users';

let Option=[]
function AddData({user, getAllNotes, notes}) {
    const dispatch = useDispatch()
    const Category = useSelector(e=>e.user.category)
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({
        data:'',
        user: user,
        collection: 'default'
    });
    const unique = (value, index, self) => {
        return self.indexOf(value) === index
      }
    useEffect(() => {
        Option = notes.map(e=> e[1].category);
        dispatch(allCategory(Option.filter(unique)));
    }, [notes])
    //console.log(Option);
    const addData =async ()=>{
        if(document.getElementById('standard-multiline-static').value !== '' && document.getElementById('collection').value !== ''){
            const addNew = await addDoc(collection(db, "notepad"), {
                    data: data.data,
                    username: data.user,
                    category: data.collection.toLowerCase(),
                    createdOn: serverTimestamp(),
            });
            if(addNew.id !== ''){
                toast.success("Sucssfully Saved");
                setOpen(false)
                //notes.push([addNew.id,{data: data.data, username: data.user, createdOn: ''}]);
                getAllNotes()
                document.getElementById('standard-multiline-static').value ='';
                setData({data:'',user: user, collection: 'default'});
            }
        }else{
            toast.warn("Empty Feild");
        }
    }
   
  return (
    <>
           
    <ToastContainer position="top-right" />
        <Fab color="primary" aria-label="add" onClick={()=>setOpen(true)} style={{position: 'fixed'}} className="m-2 bottom-0 end-0">
            <Icon>add</Icon>
        </Fab>
        <Fab color="primary" aria-label="add" onClick={()=>getAllNotes()} style={{position: 'fixed'}} className="m-2 bottom-0 start-0">
            <Icon>refresh</Icon>
        </Fab>
        <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Container fixed className='mx-auto my-1 col-11'>
            <TextField
              className='col-12'
              id="standard-multiline-static"
              label='data'
              multiline
              rows={3}
              variant="standard"
              onChange={e=>setData({...data, data: e.target.value})}
            />
            <input className='form-control mt-1' list="opyions" defaultValue={data.collection} id="collection" onChange={e=>setData({...data, collection: e.target.value})}/>  
            <datalist id="opyions">
            {Category.map((e,index)=>
                <option key={index} value={e} />
                )}
            </datalist>
            <Button className="my-1 col-12" onClick={addData} color="success" variant="outlined">Save</Button>
        </Container>
        </Box>
      </Modal>
    </>
  )
}

export default AddData

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };