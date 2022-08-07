import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "../utils/useForm";

export function Register({ isLoggedIn, isRegisterOpen, isLogged, title, btnText, handleRegisterForm, handleLoginInForm, email, password, setPassword, setEmail, handleSubmitUserRegistration }) {

    const [handleChange, , , isValid, errors] = useForm();

    useEffect(() => {


        handleRegisterForm();

    }, [])

    return (
        <div className="register">
            <h2 className="register__title">{title}</h2>
            <form className="register__form" onSubmit={(e) => { if (isValid) handleSubmitUserRegistration(e) }}>
                <input name='email' type='email' placeholder="Email" className="register__input" required value={email} onChange={(e) => { setEmail(e.target.value); handleChange(e) }} />
                <span className="register__error-message">{errors.email}</span>
                <input name='password' type='password' placeholder="Password" className="register__input" required value={password} onChange={(e) => { setPassword(e.target.value); handleChange(e) }} minLength={6} />
                <span className="register__error-message">{errors.password}</span>
                <button type="submit" className="register__button" disabled={!isValid}>{btnText}</button>
                <Link to='/signin' onClick={handleLoginInForm} className="register__link">Already a member? Log in here</Link>

            </form>
        </div >
    )
}