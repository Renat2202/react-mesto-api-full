import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';


function Main(props) {
    const {onEditAvatar, onEditProfile, onAddPlace} = props;

    const currentUser = React.useContext(CurrentUserContext);



    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container">
                    <div className="profile__avatar" alt="Аватар" style={{backgroundImage: `url(${currentUser.avatar})`}} > </div>
                    <button className="profile__avatar-edit" type="button" onClick={onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button className="profile__edit-button hovered" aria-label="Редактировать профиль" onClick={onEditProfile}></button>
                    <p className="profile__name-subline">{currentUser.about}</p>
                </div>
                <button className="profile__button hovered" aria-label="Добавить новый элемент" onClick={onAddPlace}></button>
            </section>
            <section className="elements">
            {props.cards.reverse().map((card) => (
                < Card key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} card={card}/>
                ))}
            </section>
        </main>
    )
}

export default Main