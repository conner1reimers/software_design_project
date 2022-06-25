import React, {useContext, useEffect} from 'react'
import Input from '../Input'
import {useForm} from '../../util/hooks/useForm';
import {appContext} from '../../App';

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


  const submitForm = (e) => {
    e.preventDefault();

    if(formState.username.value.length < 12 && formState.username.value.length >= 6 && 
        formState.password.value.length < 12 && formState.password.value.length >= 6) {
            if(formState.password.value != formState.password2.value) {
                alert("Try again, your passwords do not match");
                return;
            } else {
                console.log(formState);
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
                <Input inputHandler={inputHandler} id="password" label="Enter Password"/>
                <button type="submit" className="btn1">Login</button>
            </form>

            

            <div className='back-btn1'>
                 <button className='btn0' onClick={() => state.setPageState("user")}> Sign Up </button>
            </div>
       </div>
     </div>   

   )
}

export default Login