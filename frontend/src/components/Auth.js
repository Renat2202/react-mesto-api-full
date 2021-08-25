import React from 'react';
import { Link } from 'react-router-dom';

function Auth(props) {
    const { title, buttonText, onSubmit } = props;

    return(
        <form className="auth" onSubmit={onSubmit}>
            <h2 className="auth__title">{title}</h2>
            {props.children}
            <button className="auth__button hovered" type="submit">{buttonText}</button>
            
            {title === 'Регистрация' &&
               <Link to="/sign-in" className="auth__caption hovered">Уже зарегистрированы? Войти</Link>     
            }
        </form>
    );
}

export default Auth