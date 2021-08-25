import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const newAvatar = useRef('');


    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: newAvatar.current.value
        })
    }

   
    return (

        <PopupWithForm name="avatar-edit" title="Обновить аватар" buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}> 
            <input className="popup__field popup__field_url" name="avatar" id="avatar" type="url" placeholder="Ссылка на картинку" required defaultValue={''} ref={newAvatar}/>
            <span id="avatar-error" className="popup__error"></span>     
        </PopupWithForm>
    )
}

export default EditAvatarPopup