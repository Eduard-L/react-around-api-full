import { PopupWithForm } from "./PopupWithForm"
import { useRef, useEffect } from "react";
import Popup from "./Popup";
import { useForm } from "../utils/useForm"

export function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isFormLoading }) {
    const inputRef = useRef()
    const [handleChange, , resetForm, isValid, errors] = useForm();

    useEffect(() => {
        inputRef.current.value = '';
        resetForm();
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: inputRef.current.value
        });



    }

    return (

        <PopupWithForm
            isFormLoading={isFormLoading}
            title="Change profile picture"
            buttonText={`${isFormLoading ? "Loading..." : "Save"}`}
            onSubmit={handleSubmit}
            onClose={onClose}
            isOpen={isOpen}
            name="profile-img"
            isValid={isValid}


        >


            <input
                type="url"
                id="input_type_url_photo"
                className="popup__input popup__input_type_url"
                name="profileImg"
                placeholder="Enter your profile photo URL"
                ref={inputRef}
                defaultValue={''}
                minLength={6}
                onChange={handleChange}
                required
            />
            <span id="input_type_url_photo-error" className="popup__error">{errors.profileImg}</span>

        </PopupWithForm>

    )

}
