import React, { useEffect, useState } from 'react';
import Input from './components/Input';
import TestRequest from './components/TestRequest';
import logo from './logo.svg';
import "./styles/base.scss";
import { useForm } from './util/hooks/useForm';

function App() {
  const [currentUser, setCurrentUser] = useState(false);
 
  const [formState, inputHandler] = useForm();

  useEffect(() => {
    console.log(formState);
  }, [formState]);


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
        
        <form>
          <p className='heading'>test input 1</p>
            <Input inputHandler={inputHandler} id="test" label="Test label"/>
          
          <p className='heading'>test input 1</p> 
            <Input inputHandler={inputHandler} id="test2" label="Test label"/>
        </form>
        
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
