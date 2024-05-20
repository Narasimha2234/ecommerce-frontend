
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Nav from './components/Nav/Nav';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Home from"./components/home/Home"
import HomeRouting from './components/routing/HomeRouting';


function App() {
  console.log('Environment Variables:', process.env); // This should log your env variables
  console.log('API Base URL:', process.env.REACT_APP_API_BASE_URL);
  const [usertype, setUserType] = useState(localStorage.getItem('usertype') || "");
  useEffect(() => {
    localStorage.setItem('usertype', usertype);
  }, [usertype]);
  const handleRoleChange = (newRole) => {
    setUserType(newRole); 
  };
  
  
  return (
    <BrowserRouter >
     <div >
        <Routes >
            <Route exact path='/'element={
                  <>
                      <Nav handleRoleChange={handleRoleChange}/>
                      <div className='mt-5 pt-3'> <Home/></div>
                  </>    
            }></Route>
            <Route path={`/${usertype}/*`} element={<HomeRouting usertype={usertype} />}></Route>  
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
