import React, { useEffect, useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import AddCustomer from './AddCustomer';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { Button, IconButton } from '@mui/material';
import DisplayCustomer from './DisplayCustomer';
import { CSVLink } from 'react-csv';




//Renders button that download customers data as csv file
export default function ExportCustomersCSV(props) {

    const [customers, setCustomers] = useState([])

    
    const headers = [
        {label: "First name", key: "firstname"},
        {label: "Last name", key: "lastname"},
        {label: "Streetaddress", key: "streetaddress"},
        {label: "City", key: "city"},
        {label: "Postcode", key: "postcode"},
        {label: "Email", key: "email"},
        {label: "Phone number", key: "phone"}
    ]

    return(
        <div>
            <CSVLink
                data={props.customers}
                headers={headers}
                filename='testi'
                target='_blank'
            >
                <Button variant='contained'>download customers as csv</Button>
            </CSVLink>
        </div>
        
    )
}