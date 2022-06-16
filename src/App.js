import React, { useState } from 'react';
import TestRequest from './components/TestRequest';
import logo from './logo.svg';
import "./styles/base.scss";

function App() {
  const [currentUser, setCurrentUser] = useState(false);


  return (
    <div className="App">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <p> Edit and save to reload.</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </div>
        

      </header>

      <div className='test'>
        <TestRequest username="testuser" setUser={setCurrentUser}/>
      </div>

      {/* this portion only runs after the user has been set (when you click test request) */}
      {currentUser && (
        <div>
          <p>Username: {currentUser.username}</p>
          <p>Password: {currentUser.password}</p>
        </div>
      )}

    </div>
  );
}

export default App;
