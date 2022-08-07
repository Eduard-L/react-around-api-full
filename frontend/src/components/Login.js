import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "../utils/useForm";

export function Login({ handleLoginInForm, title, btnText, handleRegisterForm, password, email, setEmail, setPassword, handleLogInSubmit }) {

    const [handleChange, , , isValid, errors] = useForm();

    useEffect(() => {
        handleLoginInForm();
    }, [])

    return (
        <div className="register">
            <h2 className="register__title">{title}</h2>
            <form className="register__form" onSubmit={(e) => { if (isValid) handleLogInSubmit(e) }}>
                <input name='email' type='email' placeholder="Email" className="register__input" required value={email || ''} onChange={(e) => { setEmail(e.target.value); handleChange(e) }} />
                <span className="register__error-message">{errors.email}</span>
                <input name='password' type='password' placeholder="Password" className="register__input" required value={password || ''} onChange={(e) => { setPassword(e.target.value); handleChange(e) }} minLength={6} />
                <span className="register__error-message">{errors.password}</span>
                <button type="submit" className="register__button" disabled={!isValid}>{btnText}</button>


                <Link to='/signup' onClick={handleRegisterForm} className="register__link">Not a member yet? Sign up here!</Link>

            </form>
        </div >
    )
}