import React from 'react';
import Auth from './Auth';



function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPasswrod] = React.useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPasswrod(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onSignIn({
            email,
            password
        });
    }


    return(
        <Auth title="Вход" buttonText="Войти" onSubmit={handleSubmit}>
            <input className="auth__input" name="email" id="email" type="text" placeholder="Email" value={email} onChange={handleChangeEmail} autoComplete='email' required></input>
            <input className="auth__input" name="password" id="password" type="password" placeholder="Пароль" value={password} onChange={handleChangePassword} autoComplete="current-password" required></input>
        </Auth>
    );
}

export default Login