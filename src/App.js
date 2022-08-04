import './App.css';
import Users from './adduser';
import Assign from './workAssign';
import City from './assessment2/city';
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Users></Users>} />
      <Route path='/task2' element={<City></City>} />

      </Routes>
    </BrowserRouter>
    {/* <City/>
    <Users></Users>  */}
    </>
  );
}

export default App;
