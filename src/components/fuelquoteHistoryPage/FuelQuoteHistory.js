import React, {useContext, useEffect} from 'react'
import Input from '../Input'
import {useForm} from '../../util/hooks/useForm';
import {appContext} from '../../App';

const FuelQuoteHistory = () => {
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
    });

    return (
        <div className='fuel-quote-history'>
            <h1>Fuel Quote History</h1>
            <div className='display-history'>
            <p>This will display the quote history when the server is running.</p>
            </div>
        
            <div className='back-btn11'>
            <button className='btn00' onClick={() => state.setPageState("fuel_form")}> Get New Quote </button>
        </div>
        </div>   
        )

}



export default FuelQuoteHistory