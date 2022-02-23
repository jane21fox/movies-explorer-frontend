import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Form from '../Form/Form';
import logo from '../../images/header-logo.svg';
import { useFormWithValidation } from '../UseFormWithValidation/UseFormWithValidation';

import './Login.css';

const Login = ({ onLogin }) => {

    const history = useHistory();
    const [ApiMsg, setApiMsg] = useState('');

    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation({
        email: '',
        password: ''
    }, {
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setApiMsg('');

        const { password, email } = values;
        onLogin({ password, email })
            .then(() => {
                resetForm({
                    email: '',
                    password: ''
                }, {
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

export default Login;