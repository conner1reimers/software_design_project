import React, {useContext, useEffect} from 'react'
import Input from '../Input'
import {useForm} from '../../util/hooks/useForm';
import {appContext} from '../../App';

const Registration = () => {
  let state = useContext(appContext);

  const [formState, inputHandler] = useForm({
    username: {
        value: "",
        isValid: false
    },
    password: {
        value: "",
        isValid: false
    },
    password2: {
        value: "",
        isValid: false
    }
  });


  const submitForm = (e) => {
    e.preventDefault();

    if(formState.username.value.length < 12 && formState.username.value.length >= 6 && 
        formState.password.value.length < 12 && formState.password.value.length >= 6) {
            if(formState.password.value !== formState.password2.value) {
                alert("Try again, your passwords do not match");
                return;
            } else {
                state.setAppState({
                    userInfo: formState
                });

                state.setPageState("user")
            }
        } else {
            alert("Username and password must be between 6 and 12 characters");
            return;
        }
  }


  return (
    <div className='registration'>
        <div className='form-contain'>
{/*             
            <div className='back-btn'>
                <button className='btn' onClick={() => state.setPageState("home")}> back to home </button>
            </div> */}

            <div className='register-header'>
                <p className='label'>Sign-Up!</p>
            </div>

            <form onSubmit={submitForm}>
                <Input inputHandler={inputHandler} id="username" label="Username"/>
                <Input inputHandler={inputHandler} id="password" label="Password"/>
                <Input inputHandler={inputHandler} id="password2" label="Verify Password"/>
                <div className='login-bottom'>
                    <button type="submit" className="btn">SUBMIT</button>
                    <p onClick={() => state.setPageState('login')} className='link'>Already have an account? <span> Login </span></p>
                </div>
                
            </form>

        </div>
    </div>
  )
}

export default Registration