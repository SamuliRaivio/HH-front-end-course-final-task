import { Button, List, ListItem, ListItemText } from "@mui/material"
import { useEffect, useState } from "react"

export default function CustomerTrainings(props) {
    /* useEffect(() => fetchCustomersTrainingData(), []) */
    const [open, setOpen] = useState(false)

    /* const [trainings, setTrainings] = useState([]) */

    /* const fetchCustomersTrainingData = () => {
        fetch(props.customer.links[2].href)
        .then(res => res.json())
        .then(resData => setTrainings(resData.content))
        .catch(err => console.error(err))
    } */

    console.log(props.trainings)

    const handleClick = () => {
        console.log(props.trainings)
        
    }


    return (
        <div>
            <div>
                <Button onClick={handleClick}>y</Button>
            </div>
            {"links" in props.trainings[0] && <div>
            <List>
                {props.trainings.map((training) =>
                    <ListItem key={training.links[2].href}>
                        <ListItemText primary={training.activity} />
                    </ListItem>
                )}
            </List>
            </div> }
            
        </div>
    )
}