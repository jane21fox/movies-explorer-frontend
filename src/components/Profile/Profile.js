import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../UseFormWithValidation/UseFormWithValidation';
import { SUCCESS_MSG } from '../../utils/constants.js';

import './Profile.css';

function Profile({ onSignOut, onProfile }) {

    const currentUser = useContext(CurrentUserContext);
    const [apiMsg, setApiMsg] = useState('');
    const [isSuccess, setIsSuccess] = useState(true);

    const { values, handleChange, errors, isValid, isEqual, resetForm } = useFormWithValidation({
        name: currentUser?.name,
        email: currentUser?.email
    }, {
        name: '',
        email: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setApiMsg('');

        const { name, email } = values;
        onProfile({ name, email })
            .then((userData) => {
                resetForm({
                    name: userData.name,
                    email: userData.email
                }, {
                    name: '',
                    email: ''
                });
                setApiMsg(SUCCESS_MSG);
                setIsSuccess(true);
            })
            .catch((err) => {
                setApiMsg(err);
                setIsSuccess(false);
            });
    };

    return (
        <section className="profile">
            <form name="profile" className="profile__container" onSubmit={handleSubmit}>
                <h2 className="profile__title">Привет, {currentUser?.name}!</h2>
                <fieldset className="profile__info">
                    <label className="profile__field-label">
                        <span className="profile__field-label-text">Имя</span>
                        <input
                            type="text"
                            className={`profile__field ${errors.name !== "" && "profile__field_notvalid"}`}
                            name="name"
                            id="name"
                            placeholder="Имя"
                            autoComplete="off"
                            required
                            minLength="2"
                            maxLength="30"
                            pattern="[A-Za-zА-Яа-яЁё -]+"
                            value={values.name}
                            onChange={handleChange} />
                    </label>
                    <span className="profile__field-error">{errors.name}</span>
                    <hr className="profile__line" />
                    <label className="profile__field-label">
                        <span className="profile__field-label-text">E-mail</span>
                        <input
                            type="email"
                            className={`profile__field ${errors.email !== "" && "profile__field_notvalid"}`}
                            name="email"
                            id="email"
                            placeholder="E-mail"
                            autoComplete="off"
                            required
                            value={values.email}
                            onChange={handleChange} />
                    </label>
                    <span className="profile__field-error">{errors.email}</span>
                </fieldset>
                <span
                    className={isSuccess ? "profile__field-success" : "profile__field-apierror"}>
                    {apiMsg}
                </span>
                <button
                    className={`profile__button ${(!isValid || isEqual) && "profile__button_disabled"}`}
                    disabled={!isValid || isEqual}
                    type="submit"
                    aria-label="Редактировать">
                    Редактировать
                </button>
                <Link to="/" onClick={onSignOut} className="profile__link">
                    Выйти из аккаунта
                </Link>
            </form>
        </section>
    );
}

export default Profile;

