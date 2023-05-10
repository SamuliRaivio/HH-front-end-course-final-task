import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useState } from "react"


//Delete funtion return button component and onclick opens dialog
//Dialog asks user confirmation for delete
//Dialogs DELETE button confirmes and on handleClick calls deleteTraining function from 
//DisplayTraining component and deletes training from database, also closes the dialog
export default function DeleteTraining(props) {
    const [open, setOpen] = useState(false)

    

    const handleClick = () => {
        props.deleteTraining()
        setOpen(false)
    }

    return(
        <div>
            <Button variant="contained" color="error" onClick={() => setOpen(true)}>DELETE</Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Deleting training</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this training? 
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