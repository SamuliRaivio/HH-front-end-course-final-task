import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { IconButton, List, ListItem, ListItemText } from '@mui/material';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import { useEffect, useState } from 'react';
import CustomerTrainings from './CustomerTrainings';
import EditCustomer from './EditCustomer';
import DeleteCustomer from './DeleteCustomer';
import AddTraining from './AddTraining';


//DisplayCustomer returns Button that opens Dialog when pressed
//Dialog shows customer's full information 
//Dialog also renders CustomerTrainings component that shows customer's training in droplist and lets user add new training to customer
//EditCustomer component that lets user edit that customer's information and
//DeleteCustomer component that deletes the customer from database

export default function DisplayCustomer(props) {
    useEffect(() => fetchCustomersTrainingData(), [])

    const [open, setOpen] = useState(false)
    const [customer, setCustomer] = useState(props.customer)
    const [customerURL, setCustomerURL] = useState(props.customer.links[0].href)
    const [trainings, setTrainings] = useState([])


    //HTTPS fixes for netlify deployment problems
    const fixURL = (link) => {
        const url = new URL(link)
        url.protocol = 'https:'
        return url.href
        }

    const fetchCustomersTrainingData = () => {
        fetch(fixURL(customer.links[2].href))
        .then(res => res.json())
        .then(resData => setTrainings(resData.content))
        .catch(err => console.error(err))
    }

    const editCustomer = (newCustomer) => {
        fetch(fixURL(customer.links[0].href), {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newCustomer)
        })
        .catch(err => console.error(err))
        .then(res => props.fetchCustomersData())
        .then(setCustomer(newCustomer))
    }

    const deleteCustomer = () => {
        fetch(fixURL(customer.links[0].href), {method: 'DELETE'})
        .catch(err => console.error(err))
        .then(res => props.fetchCustomersData())
        .then(setOpen(false))
    }

    const addTraining = (training) => {
        fetch(fixURL('https://traineeapp.azurewebsites.net/api/trainings'), {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(training)
        })
        .then(res => props.fetchCustomersData())
        .then(res => fetchCustomersTrainingData())
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
                    <DialogTitle>{customer.firstname + " " + customer.lastname}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Customer information
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
                        <TextField
                            autoFocus
                            margin="dense"
                            name="address"
                            value={
                                customer.streetaddress +
                                ", " +
                                customer.city +
                                " " +
                                customer.postcode}
                            label="Address"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="email"
                            value={customer.email}
                            label="Email"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="phone"
                            value={customer.phone}
                            label="Phone"
                            fullWidth
                            variant="standard"
                        />
                        <CustomerTrainings trainings={trainings}/>
                        <AddTraining customerURL={customerURL} customer={customer} addTraining={addTraining}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <DeleteCustomer deleteCustomer={deleteCustomer}/>
                        <EditCustomer editCustomer={editCustomer} customer={customer}/>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
            </div>
            
        </div>
    )
}