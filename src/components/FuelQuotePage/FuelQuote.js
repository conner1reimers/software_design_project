import React, {useContext, useEffect} from 'react'
import Input from '../Input'
import {useForm,Controller} from '../../util/hooks/useForm';
import {appContext} from '../../App';
//import DatePicker from "react-datepicker";

const FuelQuote = () => {
  let state = useContext(appContext);

  const [formState, inputHandler,control,register,] = useForm({
    GallonsRequested: {
        value: "",
        isValid: false
    },
    
    DeliveryDate: {
        value: "",
        isValid: false
    },
    PPG: {
        value: "",
        isValid: false
    },
    Total: {
        value: "45000",
        isValid: false
    }
  });
  


  const submitForm = (e) => {
    e.preventDefault();

    if(formState.GallonsRequested.value<=0)
        {
            alert("Please enter a number greater than 0.")
            return
        }
        else
        
                console.log(formState);
            
  }


  return (
    <div className='Fuel_Quote'>
        <div className='form-contain'>
            <div className='back-btn'>
                <button className='btn' onClick={() => state.setPageState("home")}> back to home </button>
            </div>

            <div className='Fuel_Quote-header'>
                <p className='label'>Fuel Quote Form</p>
            </div>

            <form onSubmit={submitForm}>
                <Input inputHandler={inputHandler} type="numeric"id="GallonsRequested" label="Gallons Requested"/>
                <input type='text'label="Delivery Address" value="Address1" readOnly/>
                <input type="date" min="2017-04-01" label="Delivery Date"></input>
                
                <input inputHandler={inputHandler} value="Suggested Price: not avialble" label=""readOnly/>
                <button type="submit" className="btn">SUBMIT</button>
            </form>

            <div className='back-btn11'>
            <button className='btn00' onClick={() => state.setPageState("fuel_history")}> Your Fuel Quote History </button>
        </div>

        </div>
    </div>
  )
}

export default FuelQuote