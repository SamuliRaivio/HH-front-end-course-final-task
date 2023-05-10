import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

//At this stage of this application Home just returns text "This is home page"
export default function DataChart() {
    const [trainings, setTrainings] = useState([])
    useEffect(() => fetchTrainingsData(), [])

    

    const fetchTrainingsData = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
        .then(res => res.json())
        .then(resData => setTrainings(resData))

    }

    return(
        <div style={{ width: '100%', height: 600 }}>
            
        <ResponsiveContainer>
            
        <BarChart
          data={trainings}
          margin={{
            top: 100,
            right: 300,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="activity" />
          <YAxis label={{value: 'minutes', angle: -90, position: 'insideLeft'}} />
          <Tooltip />
          <Legend />
          <Bar dataKey="duration" fill="#8884d8" />
        </BarChart>
        </ResponsiveContainer>
        </div>
    )
}