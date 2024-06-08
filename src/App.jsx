
import { BrowserRouter,Route,Routes } from "react-router-dom";

import React from 'react'
import UserPreferences from "./components/UserPreferences";
import Map from "./components/Map";
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route exact path = "/" element = {<UserPreferences />} />
        <Route exact path = "/map" element = {<Map />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
