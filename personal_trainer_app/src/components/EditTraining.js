import { useState } from "react"
import { IconButton, List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";


//EditCustomer return Button component and onClick open Dialog
//Dialog opens TextFields with customer information and lets user modify them
//Dialog's Edit button's handleClick calls editCustomer function from DisplayCustomer component and edits customer's information to database and rerenderes the list

export default function EditTraining(props) {
    const [open, setOpen] = useState(false)
    const [newTraining, setNewTraining] = useState(props.training)

    const handleInputChange = (event) => {
        setNewTraining({...newTraining, [event.target.name]: event.target.value})
    }
    const handleClick = () => {
        props.editTraining(newTraining);
        setOpen(false)
    }

    return(
        <div>
            <Button variant="contained" onClick={() => setOpen(true)}>
                Edit
            </Button>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Edit Training</DialogTitle>
                <DialogContent>
                    <DialogContentText>Edit training information</DialogContentText>
                    <TextField
                            autoFocus
                            margin="dense"
                            name="activity"
                            value={newTraining.activity}
                            onChange= {event => handleInputChange(event)}
                            label="Activity"
                            fullWidth
                            variant="standard"
                        />
                        <DateTimePicker
                        value={dayjs(newTraining.date)}
                        onChange={(newDate) => setNewTraining({...newTraining, date: newDate})}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="duration"
                            value={newTraining.duration}
                            onChange= {event => handleInputChange(event)}
                            label="Duration in minutes"
                            fullWidth
                            variant="standard"
                            type="number"
                        />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleClick}>Edit</Button>
                </DialogActions>
            </Dialog>
            </LocalizationProvider>
        </div>
    )
}