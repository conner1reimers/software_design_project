import React, {useContext, useEffect} from 'react'
import Input from '../Input'
import {useForm} from '../../util/hooks/useForm';
import {appContext} from '../../App';
import {useHttpClient} from '../../util/hooks/http-hook';

const Login = () => {
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

  const {isLoading, sendRequest} = useHttpClient();


  const submitForm = async (e) => {
    e.preventDefault();

    if(formState.username.value.length < 12 && formState.username.value.length >= 6 && 
        formState.password.value.length < 12 && formState.password.value.length >= 6) {
            // VALID INPUTS

            let response;
            

            try {
                response = await sendRequest(
                    "http://localhost:5000/api/users/login", // URL
                    "POST",                                  // HTTP Request Type
                    JSON.stringify({                         // Request Body
                        username: formState.username.value,
                        password: formState.password.value
                    }),  
                    {'Content-Type': 'application/json'}    // Content Type
                );
                if(response.userInfo) {
                    state.setPageState("home");
                    state.setAppState((prevState) => {
                      return{
                        ...prevState,
                        uid: response.uid,
                        hasPreviousPurchase: response.hasPreviousPurchase,
                        userInfo: response.userInfo,
                        userInfoSet: true
                    }});
                  } else {
                    state.setPageState("user");
                    state.setAppState((prevState) => {
                      return {
                        ...prevState,
                        uid: response.uid,
                        hasPreviousPurchase: false,
                        userInfoSet: false
                    }});
                  }

            } catch (err) {
                console.log(err)
            }

            
        
        } else {
            alert("Username and password must be between 6 and 12 characters");
            return;
        }
  }


  return (
//     <div className='Login'>
//         <div className='form-contain1'>
//             <div className='register-header0'>
//                 <p className='label0'>Sign-In</p>
//             </div>

//             <form onSubmit={submitForm}>
//                 <Input inputHandler={inputHandler} id="username" label="Enter Username"/>
//                 <Input inputHandler={inputHandler} id="password" label="Enter Password"/>
//                 <button type="submit" className="btn1">Login</button>
//             </form>
//             <div className='back-btn1'>
//                 <button className='btn0' onClick={() => state.setPageState("user")}> Sign Up </button>
//             </div>
//         </div>
//     </div>
     <div className='Login'>
       <div className='login-contain'>
            <div className='login-header'>
                <p className='label0'>Sign In</p>
            </div>
            
            <form className ='input-field' onSubmit={submitForm}>
                <Input inputHandler={inputHandler} id="username" label="Enter Username"/>
                <Input inputHandler={inputHandler} id="password" password label="Enter Password"/>
                <div className='login-bottom'>
                    <button type="submit" className="btn">Login</button>
                    <p onClick={() => state.setPageState('register')} className='link'>Need an account? <span> Sign-Up </span></p>
                </div>
            </form>

            

            {/* <div className='back-btn1'>
                 <button className='btn0' onClick={() => state.setPageState("register")}> Sign Up </button>
            </div> */}

       </div>
     </div>   

   )    
}

export default Login