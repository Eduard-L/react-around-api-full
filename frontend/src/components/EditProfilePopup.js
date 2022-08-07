import { PopupWithForm } from "./PopupWithForm"
import { useState, useContext, useEffect } from "react"
import CurrentUserContext from "../contexts/CurrentUserContext"
import { useForm } from "../utils/useForm"



export function EditProfilePopup({ isOpen, onClose, onUpdateUser, isFormLoading }) {
    const userInfo = useContext(CurrentUserContext)

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [handleChange, setIsValid, resetForm, isValid, errors] = useForm();

    useEffect(() => {
        setName(userInfo.name);
        setDescription(userInfo.about);
        resetForm()
        setIsValid(true)

        // handleChange({ name: "name", value: userInfo.name })
        // handleChange({ name: "job", value: userInfo.about })

    }, [userInfo, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            description,
        });

    }
    // useEffect(() => {




    // }, [])

    return (

        <PopupWithForm


            title="Edit Profile"
            buttonText={`${isFormLoading ? "Loading..." : "Save"}`}
            onSubmit={handleSubmit}
            isFormLoading={isFormLoading}
            name="edit-profile"
            onClose={onClose}
            isOpen={isOpen}
            isValid={isValid}



        >

            <input
                type="text"
                id="input_type_name"
                className="popup__input popup__input_type_name"
                name="name"
                minLength="2"
                maxLength="40"
                placeholder="Enter Your Name"
                required
                value={name || ''}
                onChange={(e) => { setName(e.target.value); handleChange(e) }}
            />
            <span id="input_type_name-error" className="popup__error">{errors.name}</span>

            <input
                type="text"
                id="input_type_description"
                className="popup__input popup__input_type_description"
                name="job"
                minLength="2"
                maxLength="200"
                placeholder="Enter Your Job"
                required
                value={description || ''}
                onChange={(e) => { setDescription(e.target.value); handleChange(e) }}
            />
            <span id="input_type_description-error" className="popup__error">{errors.job}</span>


        </PopupWithForm>

    )
}