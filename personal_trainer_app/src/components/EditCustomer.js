import { useState } from "react"
import { IconButton, List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField} from '@mui/material';


//EditCustomer return Button component and onClick open Dialog
//Dialog opens TextFields with customer information and lets user modify them
//Dialog's Edit button's handleClick calls editCustomer function from DisplayCustomer component and edits customer's information to database and rerenderes the list

export default function EditCustomer(props) {
    const [open, setOpen] = useState(false)
    const [newCustomer, setNewCustomer] = useState(props.customer)

    const handleInputChange = (event) => {
        setNewCustomer({...newCustomer, [event.target.name]: event.target.value})
    }
    const handleClick = () => {
        props.editCustomer(newCustomer);
        setOpen(false)
    }

    return(
        <div>
            <Button variant="contained" onClick={() => setOpen(true)}>
                Edit
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Edit Customer</DialogTitle>
                <DialogContent>
                    <DialogContentText>Edit customer's information</DialogContentText>
                    <TextField
                            autoFocus
                            margin="dense"
                            name="firstname"
                            value={newCustomer.firstname}
                            onChange= {event => handleInputChange(event)}
                            label="First name"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="lastname"
                            value={newCustomer.lastname}
                            onChange= {event => handleInputChange(event)}
                            label="Last name"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="streetaddress"
                            value={newCustomer.streetaddress}
                            onChange= {event => handleInputChange(event)}
                            label="Streetaddress"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="city"
                            value={newCustomer.city}
                            onChange= {event => handleInputChange(event)}
                            label="City"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="postcode"
                            value={newCustomer.postcode}
                            onChange= {event => handleInputChange(event)}
                            label="Postcode"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="email"
                            value={newCustomer.email}
                            onChange= {event => handleInputChange(event)}
                            label="Email"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="phone"
                            value={newCustomer.phone}
                            onChange= {event => handleInputChange(event)}
                            label="Phone"
                            fullWidth
                            variant="standard"
                        />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleClick}>Edit</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}