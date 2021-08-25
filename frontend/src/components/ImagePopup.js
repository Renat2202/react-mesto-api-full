import React from 'react';

function ImagePopup (props) {
    return (
        <section className={`popup popup_image-popup ${props.card ? 'popup_opened' : ''}`}>
            <figure className="popup__figure">
                <button type="button" className="popup__close-button popup__close-button_image-popup hovered" onClick={props.onClose}></button>
                <img className="popup__image" src={props.card?.link} alt={props.card?.name}/>
                <figcaption className="popup__caption">{props.card?.name}</figcaption>
            </figure>
        </section>
    )
}

export default ImagePopup