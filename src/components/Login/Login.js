import React, { useState } from 'react';
import { Link  } from 'react-router-dom';
import Form from '../Form/Form';
import logo from '../../images/header-logo.svg';

import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const history = useHistory();

    // const resetForm = () => {
    //     setEmail('');
    //     setPassword('');
    // };

    const handleSubmit = (e) => {
        e.preventDefault();

        // onLogin({ password, email })
        // .then(() => {
        //     resetForm();
        //     history.push('/');
        // })
        // .catch((err) => {
        //     onStatus(false);
        // });
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //         history.push('/');
    //     }
    // }, []);

    return(
        <section className="login">
            <div className="login__header">
                <Link to="/" className="login__link">
                    <img src={logo} alt="Логотип" className="login__logo" />
                </Link>
                <h2 className="login__title">Рады видеть!</h2>
            </div>
            <Form 
                formName="login" 
                btnTitle="Войти"
                question="Ещё не зарегистрированы?"
                link="Регистрация"
                linkRoute="sign-up"
                name=""
                email={email}
                password={password}
                handleChangeName=""
                handleChangeEmail={handleChangeEmail}
                handleChangePassword={handleChangePassword}
                handleSubmit={handleSubmit}
            />
        </section>
    );
}

export default Login;