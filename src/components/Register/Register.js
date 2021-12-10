import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import logo from '../../images/header-logo.svg';

import './Register.css';

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // const history = useHistory();

    // const resetForm = () => {
    //     setName("");
    //     setEmail("");
    //     setEmail("");
    // };

    const handleSubmit = (e) => {
        e.preventDefault();

        // onRegister({ password, email })
        // .then(() => {
        //     onStatus(true);
        //     resetForm();
        //     history.push('/sign-in');
        // })
        // .catch((err) => {
        //     onStatus(false);
        // });
    };

    const handleChangeName = (e) => {
        setName(e.target.value);
    }

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

    return (
        <section className="register">
            <div className="register__header">
                <Link to="/" className="register__link">
                    <img src={logo} alt="Логотип" className="register__logo" />
                </Link>
                <h2 className="register__title">Добро пожаловать!</h2>
            </div>
            <Form 
                formName="register" 
                btnTitle="Зарегистрироваться"
                question="Уже зарегистрированы?"
                link="Войти"
                linkRoute="sign-in"
                name={name}
                email={email}
                password={password}
                handleChangeName={handleChangeName}
                handleChangeEmail={handleChangeEmail}
                handleChangePassword={handleChangePassword}
                handleSubmit={handleSubmit}
            />
        </section>
    );
}

export default Register;

