import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { IconButton, List, ListItem, ListItemText } from '@mui/material';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import { useEffect, useState } from 'react';
import CustomerTrainings from './CustomerTrainings';

export default function DisplayCustomer(props) {
    useEffect(() => fetchCustomersTrainingData(), [])

    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)

    const [customer, setCustomer] = useState(props.customer)
    const [trainings, setTrainings] = useState([])



    const x = () => {
        console.log(trainings)
    }

    const fetchCustomersTrainingData = () => {
        fetch(customer.links[2].href)
        .then(res => res.json())
        .then(resData => setTrainings(resData.content))
        .catch(err => console.error(err))
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
                    <DialogTitle>testi</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Add new customer
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="firstname"
                            value={customer.firstname}
                            label="First name"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="lastname"
                            value={customer.lastname}
                            label="Last name"
                            fullWidth
                            variant="standard"
                        />
                        {/* <List>
                            <ListItem>
                                <ListItemText primary="1"/>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="2"/>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="3"/>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="4"/>
                            </ListItem>
                        </List> */}
                        <CustomerTrainings trainings={trainings}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button onClick={x}>x</Button>
                        <Button onClick={() => {setOpen(false); setOpen2(true)}}>asd</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
            <Dialog open={open2} onClose={() => setOpen2(false)}>
                    <DialogTitle>testi</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Add new customer
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="firstname"
                            value="123"
                            label="First name"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="lastname"
                            value="123"
                            label="Last name"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen2(false)}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
            
        </div>
    )
}