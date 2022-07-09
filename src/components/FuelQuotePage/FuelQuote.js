import React, {useCallback, useContext, useEffect} from 'react'
import Input from '../Input'
import {useForm, Controller} from '../../util/hooks/useForm';
import {appContext} from '../../App';
import {useHttpClient} from '../../util/hooks/http-hook';
//import DatePicker from "react-datepicker";

const FuelQuote = () => {
  let state = useContext(appContext);
  const {isLoading, sendRequest} = useHttpClient();

  const [formState, inputHandler] = useForm({
    GallonsRequested: {
        value: 0,
        isValid: false
    },
    
    deliveryDate: {
        value: "",
        isValid: false
    },
    suggested: {
        value: '$0',
        isValid: false
    },
    total: {
        value: '$0',
        isValid: false
    }
  });
  


  const submitForm = async (e) => {
    e.preventDefault();

    if(formState.GallonsRequested.value<=0) {
        alert("Please enter a number greater than 0.");
        return;
    } else {
        let response;
        let date = new Date();
        date = date.toDateString();


        try {
            response = await sendRequest("http://localhost:5000/api/fuel/submitquote", 
                "POST", 
                JSON.stringify({
                    address: state.appState.userInfo.address1.value,
                    username: state.appState.userInfo.username.value,
                    date: formState.deliveryDate.value,
                    gallonsRequested: formState.GallonsRequested.value,
                    suggested: formState.suggested.value,
                    total: formState.total.value
                }),
                {"Content-Type": "application/json"});

            console.log(response)
        } catch(err) {console.log(err)}
    }
            
  }

  const requestPrice = useCallback(async () => {
    if(formState && formState.GallonsRequested && state && state.appState && state.appState.userInfo && state.appState.userInfo.state) {
        let response;
        console.log('hi')
        try {
            response = await sendRequest(
                "http://localhost:5000/api/fuel/getprice", 
                "POST",
                JSON.stringify({                         // Request Body
                    state: state.appState.userInfo.state.value,
                    previousHistory: false,
                    gallonsRequested: parseInt(formState.GallonsRequested.value)
                }),  
                {'Content-Type': 'application/json'} );
            
            if(response) {
                console.log(response);
                inputHandler("suggested", `$${response.suggested.toFixed(2)}`, true);
                inputHandler("total", `$${response.total.toFixed(2)}`, true);
            }
        } catch(err) {
            console.log(err);
        }
    }
    

  }, [formState.GallonsRequested, sendRequest, state.appState])


  useEffect(() => {
    if(formState && formState.GallonsRequested) {
        console.log(formState)
        if(formState.GallonsRequested.value > 0) {
            requestPrice();
        }
    }
    
  }, [requestPrice, formState.GallonsRequested]);


  useEffect(() => {
    console.log(formState)
  }, [formState]);


  
  return (
    <div className='Fuel_Quote'>
        <div className='form-contain'>
            <div className='back-btn'>
                <button className='btn' onClick={() => state.setPageState("home")}> back to home </button>
            </div>

            <div className='Fuel_Quote-header'>
                <p className='label'>Fuel Quote Form</p>
            </div>

            {formState && state && state.appState && state.appState.userInfo && 
            <form onSubmit={submitForm}>
                <Input inputHandler={inputHandler} value={formState.GallonsRequested.value.toString()} type="numeric" id="GallonsRequested" label="Gallons Requested" sideLabel/>
                <Input inputHandler={inputHandler} type='text' label="Delivery Address" value={state.appState.userInfo.address1 ? state.appState.userInfo.address1.value : ""} readOnly sideLabel/>
                <Input inputHandler={inputHandler} id="deliveryDate" date min="2017-04-01" label="Delivery Date" sideLabel/>
                <Input inputHandler={inputHandler} value={formState.suggested ? formState.suggested.value : "$0"} id="suggested" label="Suggested Price" readOnly sideLabel/>
                <Input inputHandler={inputHandler} value={formState.total ? formState.total.value : "$0"} id="total" label="Total Price" readOnly sideLabel/>
                <div className='form-btns'>
                    <button type="submit" className="btn">SUBMIT</button>
                    <button className='btn' onClick={() => state.setPageState("fuel_history")}> Your Fuel Quote History </button>
                </div>
                
            </form>}


        </div>
    </div>
  )
}

export default FuelQuote