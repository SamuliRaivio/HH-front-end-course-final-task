import { useEffect, useState } from "react"
import MaterialReactTable from 'material-react-table';
import dayjs from "dayjs";
import SelectCustomer from "./SelectCustomer";
import DisplayTraining from "./DisplayTraining";


//Trainings component is pretty much the same as Customers component
//Training return table of training from database
//In Table is SelectCustomer component that return button for first selecting customer and adding new training 
//Left in row is button (from Displaytraining component) that opens all info of training and lets user edit and delete the training
export default function Trainings() {
    const [trainings, setTrainings] = useState([])
    useEffect(() => fetchTrainingsData(), [])

    const fetchTrainingsData = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
        .then(res => res.json())
        .then(resData => setTrainings(resData))
    }

    //accessorFn allows custom data to be rendered from data
    //here is is used to parse date from trainings to be more user friendly
    //and compining customers first and last name
    const columns = [
        {accessorKey: 'activity', header: 'Activity'},
        {accessorKey: 'customer.firstname', header: 'First Name'},
        {accessorKey: 'customer.lastname', header: 'Last Name'},
        {accessorFn: (row) => dayjs(row.date).format('DD.MM.YYYY hh:mm'), id: 'date', header: 'Date'}
    ]

    return(
        <MaterialReactTable
            columns={columns}
            data={trainings}
            renderTopToolbarCustomActions={() => <SelectCustomer fetchTrainingsData={fetchTrainingsData}/>}
            enableRowActions
            renderRowActions={({row}) => (<DisplayTraining fetchTrainingsData={fetchTrainingsData} training={row.original} />)}
        />
    )
}