import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import { useEffect, useState } from "react";
import timeGridPlugin from '@fullcalendar/timegrid'
import dayjs from "dayjs";
import { Button } from "@mui/material";


//At this stage of this application Home just returns text "This is home page"
export default function Calendar() {
    const [trainings, setTrainings] = useState([])
    useEffect(() => fetchTrainingsData(), [])

    

    const fetchTrainingsData = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
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