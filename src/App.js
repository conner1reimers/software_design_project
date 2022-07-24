import React, { createContext, useEffect, useState } from 'react';
import Registration from './components/registrationPage/Registration';
import User from './components/userPage/User';
import FuelQuote from './components/FuelQuotePage/FuelQuote';
import Login from './components/loginPage/Login';
import FuelQuoteHistory from './components/fuelquoteHistoryPage/FuelQuoteHistory';
import GlobalMsg from './components/GlobalMsg';
import "./styles/base.scss";
import { useHttpClient } from './util/hooks/http-hook';
import { useCheckCookie } from './util/hooks/useCheckCookie';
import { useLogout } from './util/hooks/useLogout';


const initialAppState = {
  uid: null,
  userInfo: {
    name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip : "",
  },
  userInfoSet: false,
  hasPreviousPurchase: false,
  globalMsg: {
    msg: "",
    active: false,
    type: ""
  }
}

let appContext = createContext();


function App() {
  const [appState, setAppState] = useState(initialAppState);
  const [pageState, setPageState] = useState("login");
  const checkCookie = useCheckCookie(setAppState, setPageState);
  const logout = useLogout(setAppState, setPageState, initialAppState);

  useEffect(() => {
    checkCookie();
  }, [])


  return (
    <appContext.Provider value={{appState, setAppState, setPageState}}>
      <div className="App">

        <GlobalMsg/>

        <div className='heading'>
          {pageState === "home" && appState.userInfoSet && (
            <p className='label'>Welcome {appState.userInfo.name}</p>
          )}
        </div>

        {/* Links that change pageState */}
        {pageState === "home" && (
          <div className='main-links'>
            <a onClick={() => setPageState("user")}>User Profile</a>
            <a onClick={() => setPageState("fuel_form")}>Fuel Quote Form</a>
            <a onClick={() => setPageState("fuel_history")}>Fuel Quote History</a>
            <a onClick={() => logout()}>Logout</a>
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