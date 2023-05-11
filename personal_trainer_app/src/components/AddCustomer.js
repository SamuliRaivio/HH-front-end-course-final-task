import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import { useState } from "react"


//AddCustomer function returns Button component and onClick opens dialog to add new customer to the database
//AddCustomer takes fetchCustomersData as a prop to update list with new customer's data
export default function AddCustomer(props) {

    //when open state is set true dialog opens (Buttons onclick)
    const [open, setOpen] = useState(false)

    //empty customer to define new customer data
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        city: '',
        postcode: '',
        email: '',
        phone: ''})

    //handleInputChange changes customer state on user input in dialog
    const handleInputChange = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})
      }

    
    //HTTPS fixes for netlify deployment problems
    const fixURL = (link) => {
        const url = new URL(link)
        url.protocol = 'https:'
        return url.href
        }
    
    //addCustomer add new customer to the database and fetches all customers data again to update the table
    //fetchCustomersData is used as a prop from Customers
    //customer data is also set empty that the same data doesn't show when opening dialog again and lastly sets open false to close the dialog
    const addCustomer = () => {
        fetch(fixURL('http://traineeapp.azurewebsites.net/api/customers'), {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(customer)
        })
        .then(res => props.fetchCustomersData())
        .catch(err => console.error(err))
        .then(setCustomer({
            firstname: '',
            lastname: '',
            streetaddress: '',
            city: '',
            postcode: '',
            email: '',
            phone: ''}))
        .then(setOpen(false))

    }


    //handles cancel click that dialog closes and customer is set to default values
    //so when openin again the given info isnt there
    const handleCancelClick = () => {
        setCustomer({
            firstname: '',
            lastname: '',
            streetaddress: '',
            city: '',
            postcode: '',
            email: '',
            phone: ''})
        setOpen(false)
    }


    return(
        <div>
            <div>
                <Button variant="contained" onClick={() => setOpen(true)}>add new customer</Button>
            </div>
            <div>
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>testi</DialogTitle>
                    <DialogContent>
                    <TextField
                            margin="dense"
                            name="firstname"
                            value={customer.firstname}
                            onChange= {event => handleInputChange(event)}
                            label="First name"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            name="lastname"
                            value={customer.lastname}
                            onChange= {event => handleInputChange(event)}
                            label="Last name"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            name="streetaddress"
                            value={customer.streetaddress}
                            onChange= {event => handleInputChange(event)}
                            label="Streetaddress"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            name="city"
                            value={customer.city}
                            onChange= {event => handleInputChange(event)}
                            label="City"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            name="postcode"
                            value={customer.postcode}
                            onChange= {event => handleInputChange(event)}
                            label="Postcode"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            name="email"
                            value={customer.email}
                            onChange= {event => handleInputChange(event)}
                            label="Email"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            name="phone"
                            value={customer.phone}
                            onChange= {event => handleInputChange(event)}
                            label="Phone"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancelClick}>Cancel</Button>
                        <Button onClick={addCustomer}>Add</Button>
                    </DialogActions>
                </Dialog>
            </div>
            
        </div>
    )
}