import Popup from "./Popup"

function PopupWithForm({ isValid, name, title, onSubmit, buttonText, children, onClose, isFormLoading, isOpen }) {



    return (

        <Popup name={name} onClose={onClose} isOpen={isOpen}>
            <div className="popup__content">
                <h2 className="popup__title ">{title}</h2>
                <form className="popup__form" name={name} onSubmit={(e) => { if (isValid) onSubmit(e) }}   >
                    {children}
                    <button disabled={!isValid} className="popup__save-button" type="submit"><p className={`popup__save-button-text ${isFormLoading ? "popup__save-button-text_blinking" : ""}`}>{buttonText}</p></button>
                </form>
                <button
                    className="popup__close-button "
                    type="button"
                    onClick={onClose}

                >
                </button>
            </div>
        </Popup>





    )

}
export { PopupWithForm }

