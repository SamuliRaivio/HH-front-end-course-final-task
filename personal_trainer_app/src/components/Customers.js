import React, { useEffect, useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import AddCustomer from './AddCustomer';
import DisplayCustomer from './DisplayCustomer';
import ExportCustomersCSV from './ExportCustomersCSV';




//Customers function return table of customers data (table made with MaterialReactTable)
export default function Customers() {

    //first the function creates customer list to store data from api 
    const [customers, setCustomers] = useState([])

  

    //useEffect calls fetchCustomerData function that sets the data from API to customer state
    useEffect(() => fetchCustomersData(), [])




    //HTTPS fixes for netlify deployment problems
    const fixURL = (link) => {
        const url = new URL(link)
        url.protocol = 'https:'
        return url.href
        }

    const fetchCustomersData = () => {
        fetch(fixURL('http://traineeapp.azurewebsites.net/api/customers'))
        .then(res => res.json())
        .then(resData => setCustomers(resData.content))
    }

    //colums define how data is displayed in table 
    //accessorKey connect column to data (what is rendered in that row from data)
    const columns = [
        {accessorKey: 'firstname', header: 'First Name'},
        {accessorKey: 'lastname', header: 'Last Name'}
    ]

    //table uses columns and defines data to columns with customer data 
    //renderTopToolbarCustomActions makes custom action on toolbar, which is rendering AddCustomer component to the toolbar
    return(
        <MaterialReactTable
            columns={columns}
            data={customers}
            renderTopToolbarCustomActions={() =>( //actions for table toolbar, Addcustomer for adding new customer, ExportCustomerCSV to download customerdata
                <div> 
                    <AddCustomer fetchCustomersData={fetchCustomersData}/> 
                    <ExportCustomersCSV customers={customers}/>
                </div>
            )}
            enableRowActions
            //renderRowActions ads action to each row, DisplayCustomer rendern button to open dialog that contains all customer information and actions 
            //DisplayCustomer takes fetchCustomersData as a prop if customer is edited it renders customers again, row.original as a prop is that row's customer as an object
            renderRowActions={({row}) => (<DisplayCustomer fetchCustomersData={fetchCustomersData} customer={row.original}/>)}
        />
    )
}