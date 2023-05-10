import { Button, List, ListItem, ListItemText, Collapse, IconButton, endIcon, startIcon, TextField} from "@mui/material"
import { useEffect, useState } from "react"
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import dayjs from "dayjs"


//CustomerTrainings return Button, onClick opens dropdown list on customers trainings
//Button can be pressed to open list and pressed again to close it

//Some reason trainings from database had some problems and I wasn't sure how to handle them
//The problem was: some customer didn't have any trainings but the data wasn't just empty but had some different data
//Solution was that if trainings didn't had "links" in them, it was the wrong kind of data or without trainings (not sure what it means in database)
//So if everything is ok, button shows dropdown list of trainings
//if not, button shows "Customer has no trainings"
export default function CustomerTrainings(props) {
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(!open)
        
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClick} startIcon={<FitnessCenterIcon/>}>
                Trainings
                {open? <ExpandLess /> : <ExpandMore />}
            </Button>
            <Collapse in={open}>
            <List variant="filled">
                {"links" in props.trainings[0] ?
                props.trainings.map((training) =>
                    <ListItem key={training.links[2].href}>
                        <ListItemText primary={training.activity + " " + dayjs(training.date).format('DD.MM.YYYY hh:mm')} />
                    </ListItem>
                ) : 
                <ListItem >
                        <ListItemText primary="Customer has no trainings" />
                    </ListItem>
            }
            </List>
            </Collapse>
            
            

            
            
        </div>
    )
}