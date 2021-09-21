import React from 'react';
import { Route, Switch, useHistory  } from 'react-router-dom'
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/api';
import { register, authorization, checkTokenValidation } from '../utils/authorization';

import {CurrentUserContext} from '../contexts/CurrentUserContext'
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

function App() {
    const history = useHistory();
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [isTooltipPopupOpen, setTooltipPopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [isLoggedIn, setLoggedIn] = React.useState(false);
    const [isSuccess, setSuccess] = React.useState(false);

    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [email, setEmail] = React.useState('');


    React.useEffect(() => {

        // if (!isLoggedIn) {
        //     setCards([]);
        //     setCurrentUser([]);
        //     console.log('1');
        //     console.log(isLoggedIn);
        //     return
        // }
            console.log('2');
            console.log(isLoggedIn);
            api.getUserInfo()
            .then((user) => {
                setCurrentUser(user);
            })
            .catch((err) => {
                console.log(`${err}`);
             });

            api.getInitialCards()
            .then((cards) => {
                setCards(cards.reverse());
            })
            .catch((err) => {
                console.log(`${err}`);
            });
                
    }, [isLoggedIn]);

    React.useEffect(() => {
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            checkTokenValidation(token)
            .then((res) => {
                setLoggedIn(true);
                setEmail(res.email);
                history.push("/");
            })
            .catch((err) => {
                console.log(`${err}`);
            });
        }
    }, [history]);

    
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.find(i => i === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
            console.log(`${err}`);
        });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id).then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id));
        })
        .catch((err) => {
            console.log(`${err}`);
        });
    }


    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
        
    }

    function handleEditProfileClick () {
        setEditProfilePopupOpen(true);
        
    }

    function handleAddPlaceClick () {
        setAddPlacePopupOpen(true);
    }

    function closeAllPopups () {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setTooltipPopupOpen(false);
        setSelectedCard(null);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleUpdateUser(updatedUserInfo) {
        api.editProfile(updatedUserInfo).then((newUserInfo) => {
            setCurrentUser(newUserInfo);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(`${err}`);
         });
    }

    function handleUpdateAvatar(updatedUserAvatar) {
        api.editAvatar(updatedUserAvatar).then((newUserAvatar) => {
            setCurrentUser(newUserAvatar);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(`${err}`);
         });
    }

    function handleAddPlaceSubmit(card) {
        api.addCard(card).then((newCard) => {
            setCards([newCard, ...cards])
            closeAllPopups();
        })
        .catch((err) => {
            console.log(`${err}`);
         });
    }

    function handleSignUp(data) {
        register(data)
        .then((res) => {
            if (res) {  
                setTooltipPopupOpen(true);
                setSuccess(true);
                history.push("/sign-in");
            }
        })
        .catch((err) => {
            setTooltipPopupOpen(true);
            setSuccess(false);
            console.log(`${err}`);
         });
    }


    
    function handleSignIn(data) {
        authorization(data)
        .then((res) => {
            if (res.token) {
                setLoggedIn(true);
                checkTokenValidation(res.token)
                .then((res) => {
                    setEmail(res.email);
                })
                .catch((err) => {
                    console.log(`${err}`);
                });
                localStorage.setItem('token' , res.token);
                history.push('/');
            }
        })
        .catch((err) => {
            console.log(`${err}`);
         });
    }

    function handleSignOut() {
        localStorage.removeItem('token');

        // setCurrentUser({});
        // setCards([]);

        setLoggedIn(false);
    }

  return (
    

    <CurrentUserContext.Provider value={currentUser}>

    <div className="body">

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />


        < ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={selectedCard} />
        

        <PopupWithForm name="item-delete" title="Вы уверены?" buttonText="Да" />


        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

        < InfoTooltip isSuccess={isSuccess} isOpen={isTooltipPopupOpen} onClose={closeAllPopups}/>


        <div className="page">
            < Header signOut={handleSignOut} email={email} />
            <Switch>

                <ProtectedRoute exact path="/" loggedIn={isLoggedIn}>
                    < Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
                    < Footer />
                </ProtectedRoute>   
                

                <Route path="/sign-in">
                    < Login onSignIn={handleSignIn} />
                    
                </Route>
                
                <Route path="/sign-up">
                    < Register onSignUp={handleSignUp}/>
                </Route>
                
            </Switch>
        </div>

    </div>

    </CurrentUserContext.Provider>

  );
}

export default App;
