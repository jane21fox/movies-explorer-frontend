import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Form from '../Form/Form';
import logo from '../../images/header-logo.svg';
import { useFormWithValidation } from '../UseFormWithValidation/UseFormWithValidation';

import './Register.css';

function Register({ onRegister, onLogin }) {

    const history = useHistory();
    const [ApiMsg, setApiMsg] = useState('');

    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation({
        name: '',
        email: '',
        password: ''
    }, {
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setApiMsg('');

        const { name, password, email } = values;
        onRegister({ name, password, email })
            .then(() => {
                return onLogin({ password, email });
            })
            .then(() => {
                resetForm({
                    name: '',
                    email: '',
                    password: ''
                }, {
                    name: '',
                    email: '',
                    password: ''
                });
                history.push('/movies');
            })
            .catch((err) => {
                setApiMsg(err);
            });
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            history.push('/movies');
        }
    }, []);

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
                values={values}
                errors={errors}
                isValid={isValid}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                ApiMsg={ApiMsg}
            />
        </section>
    );
}

export default Register;

