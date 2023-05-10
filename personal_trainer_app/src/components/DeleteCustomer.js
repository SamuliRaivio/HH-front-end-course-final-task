import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useState } from "react"


//Delete funtion return button component and onclick opens dialog
//Dialog asks user confirmation for delete
//Dialogs DELETE button confirmes and on handleClick calls deleteCustomer function from 
//DisplayCustomer component and deletes customer from database, also closes the dialog
export default function DeleteCustomer(props) {
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        props.deleteCustomer()
        setOpen(false)
    }

    return(
        <div>
            <Button variant="contained" color="error" onClick={() => setOpen(true)}>DELETE</Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Deleting customer</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this customer? 
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} >Cancel</Button>
                    <Button variant="contained" color="error" onClick={handleClick}>DELETE</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}