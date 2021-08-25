import React from 'react';


function PopupWithForm (props) {
    return (
        <section className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''} `}>
        <form className="popup__window popup__window_edit-form" method="GET" name={props.name} onSubmit={props.onSubmit}>
            <button type="button" className="popup__close-button popup__close-button_edit-form hovered" aria-label="Закрыть" onClick={props.onClose}></button>
            <h2 className="popup__title">{props.title}</h2>
            {props.children}
            <button type="submit" className="popup__button">{props.buttonText}</button>
        </form>
      </section>
    )
}

export default PopupWithForm