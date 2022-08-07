import { useState, useEffect } from "react";
import { PopupWithForm } from "./PopupWithForm"
import Popup from "./Popup";
import { useForm } from "../utils/useForm";
export function AddPlacePopup({ isOpen, onClose, onUpdateCards, isFormLoading }) {

    const [cardName, setCardName] = useState('')
    const [cardLink, setCardLink] = useState('')
    const [handleChange, , resetForm, isValid, errors] = useForm();

    useEffect(() => {
        setCardName('');
        setCardLink('');
        resetForm()
    }, [isOpen]);


    function handleSubmit(e) {
        e.preventDefault();
        onUpdateCards(cardName, cardLink)


    }
    return (

        < PopupWithForm
            title="New Place"
            isFormLoading={isFormLoading}
            onSubmit={handleSubmit}
            buttonText={`${isFormLoading ? "Loading..." : "Save"}`}
            onClose={onClose}
            isOpen={isOpen}
            name="add-card"
            isValid={isValid}
        >



            <input
                type="text"
                id="input_type_title"
                className="popup__input popup__input_type_title"
                name="cardTitle"
                placeholder="Title"
                minLength="2"
                maxLength="30"
                required
                value={cardName || ''}
                onChange={(e) => { setCardName(e.target.value); handleChange(e) }}
            />
            <span id="input_type_title-error" className="popup__error">{errors.cardTitle}</span>

            <input
                type="url"
                id="input_type_url"
                className="popup__input popup__input_type_url"
                name="imageUrl"
                placeholder="Image URL"
                required
                value={cardLink || ''}
                onChange={(e) => { setCardLink(e.target.value); handleChange(e) }}
            />
            <span id="input_type_url-error" className="popup__error">{errors.imageUrl}</span>



        </PopupWithForm>

    )

}