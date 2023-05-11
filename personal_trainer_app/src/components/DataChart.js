import { Button } from "@mui/material";
import _, { property } from "lodash";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

//render chart of trainings
export default function DataChart() {
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

    
    //newArray modifys trainings that all same activitys are compined to one with duration from all same activity trainings
    const newArray =  _.map(_.groupBy(trainings, 'activity'), (activityArray, activityName) => {
      return {
        activity: activityName,
        duration: _.sumBy(activityArray, 'duration')
      }
    })
    

    return(
        <div style={{ width: '100%', height: 600 }}>
        <ResponsiveContainer>
        <BarChart
          data={newArray}
          margin={{
            top: 100,
            right: 300,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={'activity'} />
          <YAxis label={{value: 'minutes', angle: -90, position: 'insideLeft'}} />
          <Tooltip />
          <Legend />
          <Bar dataKey="duration" fill="#8884d8" />
        </BarChart>
        </ResponsiveContainer>
        </div>
    )
}