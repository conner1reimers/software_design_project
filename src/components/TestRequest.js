import React, { useContext, useEffect } from 'react'
import { appContext } from '../App';
import { useHttpClient } from '../util/hooks/http-hook'

const TestRequest = (props) => {
    const {isLoading, sendRequest} = useHttpClient();

    let state = useContext(appContext);

    useEffect(() => {
        state.setAppState({
            name: "test",
            dog: "nugget"
        })
    }, [])



    const queryBackend = async () => {
        let result;
        try {
            result = await sendRequest(`http://localhost:5000/api/users/test/${props.user}`);
            console.log(result);

            if(result) props.setUser(result.user);

        } catch(err) {console.log(err);}
    }


    useEffect(() => {
        if(isLoading) {console.log("REQUEST LOADING FROM FRONTEND -> BACKEND -> DATABASE");}
    }, [isLoading])

    return (
      <button className='btn' onClick={queryBackend}>Test Request</button>
    )
}

export default TestRequest