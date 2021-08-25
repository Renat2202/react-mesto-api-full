import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import headerLogo from '../images/header-logo.svg';

function Header(props) {
    const { signOut, email } = props;



    return (
        <header className="header">
            <img className="header__logo" src={headerLogo} alt="Место"/>

            <div className="header__menu-container">
                <Switch>

                        <Route exact path="/">
                            <span className="header__email">{email}</span>
                            <Link to="/sign-in" className="header__button hovered" onClick={signOut}>Выйти</Link>
                        </Route>

                        <Route path="/sign-up">
                            <Link to="/sign-in" className="header__button hovered">Войти</Link>
                        </Route>

                        <Route path="/sign-in">
                            <Link to="/sign-up" className="header__button hovered">Регистрация</Link>
                        </Route>
                    
                </Switch>
            </div>


        </header>
    )
}

export default Header