import React, {useContext, useEffect, useState} from 'react'
import Input from '../Input'
import {useForm} from '../../util/hooks/useForm';
import {appContext} from '../../App';
import {useHttpClient} from '../../util/hooks/http-hook';

const FuelQuoteHistory = () => {
    let state = useContext(appContext);
    let [quoteHistory, setQuoteHistory] = useState(false);

    const {isLoading, sendRequest} = useHttpClient();

    const getQuoteHistory = async () => {
        let response;
        try {
            response = await sendRequest(`http://localhost:5000/api/fuel/gethistory/${state.appState.uid}`);
            if(response) {
                console.log(response)
                setQuoteHistory(response);
            }
        } catch(err) {console.log(err);}
    }


    useEffect(() => {
        getQuoteHistory();
    }, []);


    return (
        <div className='fuel-quote-history'>
            <h1>{isLoading ? 'Loading.....' : 'Fuel Quote History'}</h1>
            
            <div className='display-history'>
                {/* <p>This will display the quote history when the server is running.</p> */}
                <div className='quote-history-item'>
                            <div className='quote-history-item--number'>
                                <p></p>
                            </div>
                            <div className='quote-history-item--date'>
                                <p className='label'>Date </p>
                            </div>
                            <div className='quote-history-item--address'>
                                <p className='label'>Delivery Address</p>
                            </div>
                            <div className='quote-history-item--gallons'>
                                <p className='label'>Gallons</p>
                            </div>
                            <div className='quote-history-item--price'>
                                <p className='label'>Price per gallon</p>
                            </div>
                            <div className='quote-history-item--total'>
                                <p className='label'>Total price</p>
                            </div>
                        </div>

                {quoteHistory && quoteHistory.map((element, indx) => {
                    let date = new Date(element.delivery_date);

                    return (
                        <div key={element.id} className='quote-history-item'>
                            <div className='quote-history-item--number'>
                                <p>{indx+1}</p>
                            </div>
                            <div className='quote-history-item--date'>
                                <p>{date.toDateString()}</p>
                            </div>
                            <div className='quote-history-item--address'>
                                <p>{element.delivery_address}</p>
                            </div>
                            <div className='quote-history-item--gallons'>
                                <p>{element.gallons}</p>
                            </div>
                            <div className='quote-history-item--price'>
                                <p>{element.suggested}</p>
                            </div>
                            <div className='quote-history-item--total'>
                                <p>{element.total}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        
            <div className='back-btn11'>
                <button className='btn' onClick={() => state.setPageState("fuel_form")}> Get New Quote </button>
            </div>
        </div>   
        )

}



export default FuelQuoteHistory