import './App.css';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './Pages/Home';
import Tanstack from './Pages/Tanstack';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import UserList from './Pages/UserList';
function App() {
  return (
    <>
      {/* first task ezhuthanam pinne ath ezhuthan ulla inputvenam list cheyyanam */}
      {/* second edit delete button venaam workong ayi irikkanam  */}
      {/* check list venam  */}
      {/* show completed tasks also */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/tan" element={<Tanstack />}></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/Users" element={<UserList />}></Route>
      </Routes>
    </>
  );
}

export default App;
