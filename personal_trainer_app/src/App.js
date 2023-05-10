import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Customers from './components/Customers';
import Trainings from './components/Trainings';
import { AppBar, Box, Button } from '@mui/material';
import Calendar from './components/Calendar';
import DataChart from './components/DataChart';


//App function renders BrowserRouter inside AppBar
//Clicking buttons in BrowserRouter lets user to navigate in the application
function App() {
  return (
    <div>
      <BrowserRouter>
      
      <AppBar position='sticky'>
      <Box>
          <Button component={Link} to='/' color='inherit'>Home</Button>
          <Button component={Link} to='/customers' color='inherit'>Customers</Button>
          <Button component={Link} to='/trainings' color='inherit'>Trainings</Button>
          <Button component={Link} to='/calendar' color='inherit'>Calendar</Button>
          <Button component={Link} to='/chart' color='inherit'>Chart</Button>
          </Box>
          </AppBar>
    
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path='/customers' element={<Customers />}></Route>
          <Route path='/trainings' element={<Trainings />}></Route>
          <Route path='/calendar' element={<Calendar />}></Route>
          <Route path='/chart' element={<DataChart />}></Route>
        </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;
