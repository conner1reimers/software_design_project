import React, {useContext, useEffect} from 'react'
import Input from '../Input'
import {useForm} from '../../util/hooks/useForm';
import {appContext} from '../../App';
import { useHttpClient } from '../../util/hooks/http-hook';

const Registration = () => {
  let state = useContext(appContext);
  const {isLoading, sendRequest} = useHttpClient();


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


  const submitForm = async (e) => {
    e.preventDefault();
    let response;
    if(formState.username.value.length < 12 && formState.username.value.length >= 6 && 
        formState.password.value.length < 12 && formState.password.value.length >= 6) {
            if(formState.password.value !== formState.password2.value) {
                alert("Try again, your passwords do not match");
                return;
            } else {
                response = await sendRequest(
                    "http://localhost:5000/api/users/register", // URL
                    "POST",                                  // HTTP Request Type
                    JSON.stringify({                         // Request Body
                        username: formState.username.value,
                        password: formState.password.value,
                        password2: formState.password2.value

                    }),  
                    {'Content-Type': 'application/json'}    // Content Type
                );
                if(response.msg === "Successfully Created an Account") {
                    state.setAppState((prevState) => {
                        return {
                            ...prevState,
                            uid: response.id,
                            userInfo: {
                                username: formState.username.value
                            }
                        }
                    });
                    state.setPageState("user");
                }
                
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