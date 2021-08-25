import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        if (currentUser && currentUser.name && currentUser.about) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser, props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        });
    }

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }



    return (
        <PopupWithForm name="edit-form" title="Редактировать профиль" buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}> 
            <input 
            className="popup__field popup__field_name" 
            name="name" 
            id="name" 
            type="text" 
            placeholder="Имя пользователя" 
            required 
            minLength="2" 
            maxLength="40" 
            value={name}
            onChange={handleChangeName}
            />
            <span id="name-error" className="popup__error"></span>
            <input className="popup__field popup__field_subline" name="about" id="about" type="text" placeholder="О себе" required minLength="2" maxLength="200" value={description} onChange={handleChangeDescription}/>
            <span id="subline-error" className="popup__error"></span>
        </PopupWithForm> 
    )
}

export default EditProfilePopup;

