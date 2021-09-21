import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner === currentUser._id;

    const cardDeleteButtonClassName = (
        `${isOwn ? 'element__trash-button element__trash-button_visible' : 'element__trash-button element__trash-button_hidden'}`
    );

    const isLiked = props.card.likes.find(i => i === currentUser._id);

    const cardLikeButtonClassName = (
        `element__like-button ${isLiked ? 'element__like-button_active' : ''}`
    )


    function handleClick() {
        // console.log(props.card);
        props.onCardClick(props.card);
    } 

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }



    return (
        <div className="element">
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick} aria-label="Удалить"></button>
            <div className="element__image" onClick={handleClick} style={{backgroundImage: `url(${props.card.link})`}}></div>
            <div className="element__caption">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__like-container">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} aria-label="Поставить лайк"></button>
                    <span className="element__like-counter">{props.card.likes.length}</span>
                </div>    
            </div>
        </div>
    )
}

export default Card