import React, { createContext, useEffect, useState } from 'react';
import Registration from './components/registrationPage/Registration';
import User from './components/userPage/User';
import FuelQuote from './components/FuelQuotePage/FuelQuote';
import "./styles/base.scss";


let appContext = createContext();


function App() {
  const [appState, setAppState] = useState();
  const [pageState, setPageState] = useState("home");


  return (
    <appContext.Provider value={{appState, setAppState, setPageState}}>
      <div className="App">

        {/* Links that change pageState */}
        {pageState === "home" && (
          <div className='main-links'>
            <a onClick={() => setPageState("register")}>Sign-Up</a>
            <a onClick={() => setPageState("login")}>Login</a>
            <a onClick={() => setPageState("user")}>User Profile</a>
            <a onClick={() => setPageState("fuel_form")}>Fuel Quote Form</a>
            <a onClick={() => setPageState("fuel_history")}>Fuel Quote History</a>

          </div>
        )}
        
        {/* Renders component based on pageState */}
        {pageState === "register" && <Registration/>}
        {pageState === "user" && <User/>} 
        {pageState === "fuel_form" && <FuelQuote/>}       
        

      </div>
    </appContext.Provider>
  );
}

export {appContext};
export default App;
