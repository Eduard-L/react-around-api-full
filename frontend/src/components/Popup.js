import { useEffect } from "react";

const Popup = ({ isOpen, name, onClose, children }) => {

    useEffect(() => {

        if (!isOpen) return;

        const closeByEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        }

        document.addEventListener('keydown', closeByEscape)

        return () => document.removeEventListener('keydown', closeByEscape)

    }, [isOpen, onClose])


    const handleOverlay = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }


    return (
        <div
            className={`popup ${isOpen ? "popup_visible" : ""} popup_type_${name}`}
            onClick={handleOverlay}
        >
            {children}

        </div>
    );
};

export default Popup;
