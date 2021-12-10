import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './Profile.css';

function Profile({ onSignOut }) {
    
    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);

    // const history = useHistory();

    // const resetForm = () => {
    //     setName('');
    //     setEmail('');
    // };

    const handleSubmit = (e) => {
        e.preventDefault();

    //     onLogin({ name, email })
    //     .then(() => {
    //         resetForm();
    //         history.push('/');
    //     })
    //     .catch((err) => {
    //         onStatus(false);
    //     });
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangeName = (e) => {
        setName(e.target.value);
    }

    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //         history.push('/');
    //     }
    // }, []);

    return (
        <section className="profile">
            <form name="profile" className="profile__container" onSubmit={handleSubmit}> 
                <h2 className="profile__title">Привет, {currentUser?.name}!</h2>
                <fieldset className="profile__info">
                    <label className="profile__field-label">
                        <span className="profile__field-label-text">Имя</span>
                        <input type="text" className="profile__field" name="name" id="name" placeholder="Имя" 
                            autoComplete="off" required minLength="2" maxLength="30" value={name} onChange={handleChangeName} />
                    </label>
                    <span className="profile__field-error user-name-error"></span>
                    <hr className="profile__line"/>
                    <label className="profile__field-label">
                        <span className="profile__field-label-text">E-mail</span>
                        <input type="email" className="profile__field" name="email" id="email" placeholder="E-mail" 
                            autoComplete="off" required value={email} onChange={handleChangeEmail} />
                    </label>
                    <span className="profile__field-error user-email-error"></span>
                </fieldset>
                <button className="profile__button" type="submit" aria-label="Редактировать">Редактировать</button>
                <Link to="/sign-in" onClick={onSignOut} className="profile__link">
                    Выйти из аккаунта
                </Link>
            </form>
        </section>
    );
}

export default Profile;

