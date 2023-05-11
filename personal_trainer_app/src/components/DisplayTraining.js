import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { IconButton, List, ListItem, ListItemText } from '@mui/material';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import { useEffect, useState } from 'react';
import dayjs from "dayjs";
import DeleteTraining from './DeleteTraining';
import EditTraining from './EditTraining';

//Basicly same as DisplayCustomer 
export default function DisplayTraining(props) {
    const [open, setOpen] = useState(false)

    const [training, setTraining] = useState(props.training)

    

    const deleteTraining = () => {
        fetch(`https://traineeapp.azurewebsites.net/api/trainings/${training.id}`, {method: 'DELETE'})
        .catch(err => console.error(err))
        .then(res => props.fetchTrainingsData())
        .then(setOpen(false))
    }

    const editTraining = (newTraining) => {
        fetch(`https://traineeapp.azurewebsites.net/api/trainings/${training.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newTraining)
        })
        .catch(err => console.error(err))
        .then(res => props.fetchTrainingsData())
        .then(setTraining(newTraining))
        .then(setOpen(false))
    }


    return(
        <div>
        <div>
            <IconButton onClick={() => setOpen(true)}>
                <ReadMoreIcon/>
            </IconButton>
        </div>
        <div>
        <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{training.activity}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Training information
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        label="Activity"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="date"
                        value={dayjs(training.date).format('DD.MM.YYYY hh:mm')}
                        label="Date"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        label="Duration in minutes"
                        fullWidth
                        variant="standard"
                    />
                    {"customer" in training ? 
                    <div>
                    <TextField
                    autoFocus
                    margin="dense"
                    name="customer.firstname"
                    value={training.customer.firstname}
                    label="Customer's first name"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="customer.lastname"
                    value={training.customer.lastname}
                    label="Customer's last name"
                    fullWidth
                    variant="standard"
                /></div>
                    : <div></div>}
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <DeleteTraining deleteTraining={deleteTraining}/>
                    <EditTraining editTraining={editTraining} training={training} />
                </DialogActions>
            </Dialog>
        </div>
        <div>
        </div>
        
    </div>
    )
}