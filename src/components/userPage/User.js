import React, { useContext } from 'react'
import Input from '../Input'
import {useForm} from '../../util/hooks/useForm';
import { appContext } from '../../App';
import StateDropdown from './StateDropdown';
import {useHttpClient} from '../../util/hooks/http-hook';

const User = () => {
  const state = useContext(appContext);
  const {isLoading, sendRequest} = useHttpClient();

  const [formState, inputHandler] = useForm({
        name: {
            value: "",
            isValid: false
        },
        address1: {
            value: "",
            isValid: false
        },
        city: {
            value: "",
            isValid: false
        },
        state: {
            value: "",
            isValid: false
        },
        zip : {
            value: "",
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

    state.setAppState((prevState) => {
        return {
            ...prevState,
            userInfo: {
                ...prevState.userInfo,
                ...formState
            }
        }
    });

    state.setPageState("fuel_form");

    let response;

    try {

        response = await sendRequest(
            "http://localhost:5000/api/users/User_profile", // URL
            "POST",                                  // HTTP Request Type
            JSON.stringify({                         // Request Body
                name: formState.name.value,
                address1: formState.address1.value,
                address2: formState.address2.value,
                city: formState.city.value,
                state: formState.state.value,
                zip: formState.zip.value

            }),  
            {'Content-Type': 'application/json'}    // Content Type
        );
        

        if(response) console.log(response)
            
    } catch (err) {
        console.log(err)
    }

    

    //console.log(formState)

    // state.setAppState((prevState) => {
    //     return {
    //         ...prevState,
    //         userInfo: {
    //             ...prevState.userInfo,
    //             ...formState
    //         }
    //     }
        
    // });
    
    //state.setPageState("home");

  }

  return (
    <div className='user-page'>
        <div className='form-contain'>
            <div className='back-btn'>
                <button className='btn' onClick={() => state.setPageState("home")}> back to home </button>
            </div>

            <div className='register-header'>
                <p className='label'>Profile Management</p>
            </div>

            <form onSubmit={submitForm}>
                <Input inputHandler={inputHandler} id="name" label="Full Name"/>
                <Input inputHandler={inputHandler} id="address1" label="Address 1"/>
                <Input inputHandler={inputHandler} id="address2" label="Address 2"/>
                <Input inputHandler={inputHandler} id="city" label="City"/>
                <StateDropdown inputHandler={inputHandler}/>
                <Input inputHandler={inputHandler} id="zip" label="Zipcode"/>
                <button type="submit" className="btn" onClick={() => state.setPageState("fuel_form")}>SUBMIT</button>
            </form>

        </div>
    </div>
  )
}

export default User