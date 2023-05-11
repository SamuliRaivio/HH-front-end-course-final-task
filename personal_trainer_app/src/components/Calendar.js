import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import { useEffect, useState } from "react";
import timeGridPlugin from '@fullcalendar/timegrid'
import dayjs from "dayjs";
import { Button } from "@mui/material";


//renders calendar with trainings
export default function Calendar() {
    const [trainings, setTrainings] = useState([])
    useEffect(() => fetchTrainingsData(), [])

    

    //HTTPS fixes for netlify deployment problems
    const fixURL = (link) => {
        const url = new URL(link)
        url.protocol = 'https:'
        return url.href
        }


    const fetchTrainingsData = () => {
        fetch(fixURL('https://traineeapp.azurewebsites.net/gettrainings'))
        .then(res => res.json())
        .then(resData => setTrainings(resData))

    }

    
    

    return(
        <div>
            <Button onClick={()=> console.log(trainings[0].date)}>asd</Button>
            <Button onClick={()=> console.log(dayjs(trainings[0].date).add(30, 'm').toISOString())}>asd2</Button>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="timeGridWeek"
                nowIndicator={true}
                events={
                    trainings.map(training => ({
                        title: training.activity + ' / ' + training.customer.firstname + ' ' + training.customer.lastname,
                        start: training.date,
                        end: dayjs(trainings[0].date).add(training.duration, 'm').toISOString()}))
                }
                headerToolbar={{
                   start: 'dayGridMonth,timeGridWeek,timeGridDay',
                   center: 'title'
                }}
            />
        </div>
    )
}