import { useState } from "react"


export const useForm = (initInputs) => {
    const [formSate, setFormState] = useState(initInputs);

    const inputChangeHandler = (id, value, valid) => {
        setFormState((prevState) => {
            return {
                ...prevState,
                [id]: {
                    value: value,
                    isValid: valid
                }
            }
        })
    };


    return [formSate, inputChangeHandler];
}