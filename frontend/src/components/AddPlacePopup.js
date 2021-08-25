import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');



    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
            title: name,
            image: link
        });

        setName('');
        setLink('');
    }

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeLink(e) {
        setLink(e.target.value)
    }

    return (
        <PopupWithForm name="item-form" title="Новое место" buttonText="Создать" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input className="popup__field popup__field_title" name="title" id="title" type="text" placeholder="Название" required minLength="2" maxLength="30" value={name} onChange={handleChangeName}/>
            <span id="title-error" className="popup__error"></span>
            <input className="popup__field popup__field_image" name="image" id="image" type="url" placeholder="Ссылка на картинку" required value={link} onChange={handleChangeLink}/>
            <span id="image-error" className="popup__error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup