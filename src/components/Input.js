import React, { useEffect, useState } from 'react'


const Input = (props) => {

  const [inputState, setInput] = useState(
    {
      value: props.value || '',
      isValid: props.isValid || false,
      showLabel: true
    });

  

  
  const changeHandler = (e) => {
    setInput((prevState) => {
        return {
            ...prevState,
            value: e.target.value,
            showLabel: (e.target.value.length < 1),
            isValid: (e.target.value.length < 1)
        }
    })
  };

  useEffect(() => {
    props.inputHandler(props.id, inputState.value, inputState.isValid);
  }, [inputState.value, inputState.isValid])


  return (
    <div className='form-row'>

        <div className='form-element'>
            <div className='form-element-label'>
                {inputState.showLabel ? <p>{props.label}</p> : null}
            </div>
            
            <input 
              onChange={changeHandler} 
              className={`${props.class || ''}`}
              value={inputState.value}
            />
        </div>
    </div>
  )
}

export default Input