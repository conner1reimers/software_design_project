import React, { useContext, useEffect } from 'react'
import Input from '../Input'
import {useForm} from '../../util/hooks/useForm';
import { appContext } from '../../App';
import StateDropdown from './StateDropdown';
import {useHttpClient} from '../../util/hooks/http-hook';
import { useGlobalMsg } from '../../util/hooks/useGlobalMsg';

const User = () => {
  const state = useContext(appContext);
  const {isLoading, sendRequest} = useHttpClient();
  const setGlobalMsg = useGlobalMsg();

  console.log(state.appState)

  const [formState, inputHandler] = useForm({
        name: {
            value: state.appState.userInfo.name,
            isValid: false
        },
        address1: {
            value: state.appState.userInfo.address1,
            isValid: false
        },
        city: {
            value: state.appState.userInfo.city,
            isValid: false
        },
        state: {
            value: state.appState.userInfo.state,
            isValid: false
        },
        zip : {
            value: state.appState.userInfo.zip,
            isValid: false
        },
  });

  

  const submitForm = async (e) => {
    e.preventDefault();

    if(formState.name.value === "" || formState.name.value.length > 50 || formState.name.value.length < 2)  {
        alert("Full name must be between 2 and 50 characters");
        return;
    }

    if(formState.address1.value === "" || formState.address1.value.length > 100 || formState.address1.value.length < 5) {
        alert("Address must be between 5 and 100 characters");
       return;
    }

    if(formState.address2.value === "" || formState.address2.value.length > 100 || formState.address2.value.length < 5) {
        alert("Address must be between 5 and 100 characters");
        return;
    }

    if(formState.city.value === "" || formState.city.value.length > 100 || formState.city.value.length < 1) {
        alert("City must be between 1 and 100 characters");
        return;
    }

    if(formState.state.value.length !== 2) {
        alert("Please select a state");
        return;
    }

    if(formState.zip.value === "" || formState.zip.value.length > 9 || formState.zip.value.length < 5) {
        alert("Zipcode must be between 5 and 9 characters");
        return;
    }

    const zipTest = /^\d+$/.test(formState.zip.value); //tests that zipcode is only digits

    if(!zipTest) {
        alert("Zipcode must contain only digits");
        return;
    }

    let response;

    try {
        console.log(state.appState)
        
        response = await sendRequest(
            "http://localhost:5000/api/users/User_profile", // URL
            "POST",                                  // HTTP Request Type
            JSON.stringify({           
                uid: state.appState.uid,               
                name: formState.name.value,
                address1: formState.address1.value,
                address2: formState.address2.value,
                city: formState.city.value,
                state: formState.state.value,
                zip: formState.zip.value,
                infoSet: state.appState.userInfoSet
    
            }),  
            {'Content-Type': 'application/json'}    // Content Type
        );
    

        

        if(response.msg) {
            setGlobalMsg(response.msg);
            state.setAppState((prevState) => {
                return {
                    ...prevState,
                    userInfo: {
                        ...prevState.userInfo,
                        name: formState.name.value,
                        address1: formState.address1.value,
                        address2: formState.address2.value,
                        city: formState.city.value,
                        state: formState.state.value,
                        zip: formState.zip.value
                    },
                    userInfoSet: true
                }
            });
            state.setPageState("fuel_form");
        }
            
    } catch (err) {
        console.log(err)
    }

  }


  useEffect(() => {
    setGlobalMsg("You must enter information before you continue");
  }, [])


  return (
    <div className='user-page'>
        <div className='form-contain user-form-contain'>
            {state.appState.userInfoSet && <div className='back-btn'>
                <button className='btn' onClick={() => state.setPageState("home")}> back to home </button>
            </div>}

            <div className='register-header'>
                <p className='label'>Profile Management</p>
            </div>

            <form onSubmit={submitForm}>
                <Input inputHandler={inputHandler} id="name" label="Full Name" value={state.appState.userInfo.name}/>
                <Input inputHandler={inputHandler} id="address1" label="Address 1" value={state.appState.userInfo.address1}/>
                <Input inputHandler={inputHandler} id="address2" label="Address 2" value={state.appState.userInfo.address2}/>
                <Input inputHandler={inputHandler} id="city" label="City" value={state.appState.userInfo.city}/>
                <StateDropdown inputHandler={inputHandler}/>
                <Input inputHandler={inputHandler} id="zip" label="Zipcode" value={state.appState.userInfo.zip}/>
                <button type="submit" className="btn">SUBMIT</button>
            </form>

        </div>
    </div>
  )
}

export default User