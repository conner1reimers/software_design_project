import React, { createContext, useEffect, useState } from 'react';
import Registration from './components/registrationPage/Registration';
import User from './components/userPage/User';
import FuelQuote from './components/FuelQuotePage/FuelQuote';
import Login from './components/loginPage/Login';
import FuelQuoteHistory from './components/fuelquoteHistoryPage/FuelQuoteHistory';
import "./styles/base.scss";
import "./styles/main/Login.scss";
import "./styles/main/FuelQuoteHistory.scss";


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
        {pageState === "login" && <Login/>}
        {pageState === "register" && <Registration/>}
        {pageState === "user" && <User/>} 
        {pageState === "fuel_form" && <FuelQuote/>}       
        {pageState === "fuel_history" && <FuelQuoteHistory/>}  
        

      </div>
    </appContext.Provider>
  );
}

export {appContext};
export default App;