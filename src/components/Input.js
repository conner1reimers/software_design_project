import React, { useEffect, useState } from 'react'


const Input = (props) => {

  const [inputState, setInput] = useState(
    {
      value: props.value || '',
      isValid: props.isValid || false,
      showLabel: (!props.value || (props.value && props.value.length < 1) || props.sideLabel) ? true : false
    });

  

  
  const changeHandler = (e) => {
    if(!props.readOnly) {
      setInput((prevState) => {
        return {
            ...prevState,
            value: e.target.value,
            showLabel: (props.sideLabel || (e.target.value.length < 1)),
            isValid: (e.target.value.length < 1)
        }
    })
    }
  };

  useEffect(() => {
    props.inputHandler(props.id, inputState.value, inputState.isValid);
    console.log(inputState)
  }, [inputState.value, inputState.isValid]);




  return (
    <div className='form-row'>

        <div className={`form-element ${!props.readOnly ? "" : "form-element--readonly"} ${props.sideLabel ? "form-element--sidelabel" : ""}`}>
            <div className={`form-element-label ${props.sideLabel ? "form-element-label--side" : ""}`}>
                {inputState.showLabel ? <p>{props.label}</p> : null}
            </div>
            
            <input 
              onChange={changeHandler} 
              className={`${props.class || ''}`}
              value={`${(props.readOnly && !props.sideLabel) ? "" : (props.readOnly) ? props.value : inputState.value}`}
              type={`${props.password ? 'password' : props.date ? 'date' : 'text'}`}
              min={`${props.min ? props.min : ''}`}
            />
        </div>
    </div>
  )
}

export default Input