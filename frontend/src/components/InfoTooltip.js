import React from 'react';
import registrationSuccessImage from '../images/registration-success.svg'
import registrationFailedImage from '../images/registration-failed.svg'

function InfoTooltip(props) {
    return(
        <section className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__window popup__window_tooltip">
                <button type="button" className="popup__close-button hovered" aria-label="Закрыть" onClick={props.onClose}></button>
                <img className="popup__tooltip-image" src={ props.isSuccess ? registrationSuccessImage : registrationFailedImage } alt={props.isSuccess ? "Успешная регистрация" : "Ошибка регистрации"}/>
                <span className="popup__tooltip-message">{ props.isSuccess ? `Вы успешно зарегистрировались!` : `Что-то пошло не так! Попробуйте ещё раз.`}</span>
            </div>
        </section>
    );
};

export default InfoTooltip