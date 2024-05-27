
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Nav from './components/Nav/Nav';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import React, { useEffect } from 'react';
import Home from"./components/home/Home"
import HomeRouting from './components/routing/HomeRouting';
import DefaultHome from './components/home/DefaultHome';


function App() {

 const userRole=localStorage.getItem("userRole")


  
  
  
  return (
    <BrowserRouter >
        <HomeRouting/>
    </BrowserRouter>
  );
}

export default App;
