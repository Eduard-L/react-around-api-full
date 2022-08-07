import { useState } from "react";

const useForm = () => {

    const [info, setInfo] = useState({})
    const [errors, setErrors] = useState({})
    const [isValid, setIsValid] = useState(false);


    const resetForm = () => {
        setInfo({ name: "", password: "" })
        setIsValid(false)
        setErrors({})
    }




    const handleChange = (e) => {
        const { name, value } = e.target
        setInfo({
            ...info,
            [name]: value
        })


        setErrors({
            ...errors,
            [name]: e.target.validationMessage
        })
        setIsValid(e.target.closest('form').checkValidity())



    }



    return [handleChange, setIsValid, resetForm, isValid, errors]
}

export { useForm }