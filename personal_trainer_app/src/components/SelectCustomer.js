import { Button, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import AddTraining from "./AddTraining";


//Select customer return button and pressed opens dialog
//dialog displays selective list of all customers
//selecting customers opens button (from AddTraining component) for adding new training for that customer
export default function SelectCustomer(props) {
    const [customers, setCustomers] = useState([])
    const [customer, setCustomer] = useState('')
    const [customerURL, setCustomerURL] = useState('')
    useEffect(() => fetchCustomersData(), [])

    const [open, setOpen] = useState(false)
    const [disabled, setDisabled] = useState(false)

    //HTTPS fixes for netlify deployment problems
    const fixURL = (link) => {
        const url = new URL(link)
        url.protocol = 'https:'
        return url.href
        }

    const fetchCustomersData = () => {
        fetch(fixURL('http://traineeapp.azurewebsites.net/api/customers'))
        .then(res => res.json())
        .then(resData => setCustomers(resData.content))
    }

    const addTraining = (training) => {
        fetch(fixURL('https://traineeapp.azurewebsites.net/api/trainings'), {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(training)
        })
        .then(res => fetchCustomersData())
        .then(res => props.fetchTrainingsData())
        .then(setCustomer(''))
        .then(setOpen(false))
        .catch(err => console.error(err))
    }

    const handleChange = (event) => {
        
        setCustomerURL(fixURL(event.target.value.links[0].href))
        setCustomer(event.target.value)
        setDisabled(true)
    }




    return(
        <div>
            <Button variant="contained" onClick={() => setOpen(true)}>Add new training</Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Select Customers</DialogTitle>
                <DialogContent>
                    
                    <FormControl fullWidth>
                        <InputLabel>Customer</InputLabel>
                        <Select 
                            value={customer}
                            onChange={handleChange}
                        >
                            {customers.map((customer) =>
                                <MenuItem
                                    key={customer.links[0].href}
                                    value={customer}
                                    >
                                        {customer.firstname} {customer.lastname}
                                    </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Collapse in={disabled}>
                        <AddTraining customerURL={customerURL} customer={customer} addTraining={addTraining}/>
                    </Collapse>
                    
                </DialogActions>
            </Dialog>
        </div>
    )
}