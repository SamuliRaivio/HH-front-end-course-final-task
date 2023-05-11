import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import { DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers"
import { useState } from "react"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


//AddTraining renders button and onclick open dialog
//Dialog asks data to new training and adds it to database
export default function AddTraining(props) {

    const [open, setOpen] = useState(false)
    const [training, setTraining] = useState({
        date: "",
        activity: "",
        duration: "",
        customer: ""
    })

    const customer = props.customerURL

    
    const handleInputChange = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
    }

    const handleClick = () => {
        const newTraining = ({...training, customer: customer})
        props.addTraining(newTraining)
        setOpen(false)
        
        

    }

    return(
        <div>
            <Button onClick={() => setOpen(true)}>Add new training</Button>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add new training for {props.customer.firstname} {props.customer.lastname}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        asdasd
                    </DialogContentText>

                    <DateTimePicker
                        value={training.date}
                        onChange={(newDate) => setTraining({...training, date: newDate})}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange= {event => handleInputChange(event)}
                        label="Duration in minutes"
                        fullWidth
                        variant="standard"
                        type="number"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange= {event => handleInputChange(event)}
                        label="Activity"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleClick}>Add</Button>
                </DialogActions>

            </Dialog>
            </LocalizationProvider>
        </div>
    )
}
