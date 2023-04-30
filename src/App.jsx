import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";

import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';


//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";    

// Import pages
import Dashboard from './pages/Dashboard';
import Menu from './pages/Menu';
import { Login } from './pages/login';
import Navigation from './navigation/navigations';
import dotenv from 'dotenv';
import { addFoodSlice, postNewFood } from './store/food-store';

function App() {

  const dispatch = useDispatch();
  const location = useLocation();
 // dotenv.config();

  useEffect(() => {
    dispatch(postNewFood())
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Navigation/>
    </>
  );
}

export default App;
