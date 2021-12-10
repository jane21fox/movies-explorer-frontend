import { Link } from 'react-router-dom';

import './Form.css';

function Form({ 
    formName,
    btnTitle,
    question,
    link,
    linkRoute,
    name,
    email,
    password,
    handleChangeName,
    handleChangeEmail,
    handleChangePassword,
    handleSubmit 
    }) {

    return (
        <>
            <form className="form__container" name={formName} onSubmit={handleSubmit}>
                <fieldset className="form__info">
                    {formName === "register" && <label className="form__field-label">
                        <span className="form__field-label-text">Имя</span>
                        <input type="text" className="form__field" name="name" id="name" placeholder="Имя" 
                            autoComplete="off" required minLength="2" maxLength="30" value={name} onChange={handleChangeName} />
                        <span className="form__field-error user-name-error"></span>
                    </label>}
                    <label className="form__field-label">
                        <span className="form__field-label-text">E-mail</span>
                        <input type="email" className="form__field" name="email" id="email" placeholder="Email" 
                            autoComplete="off" required value={email} onChange={handleChangeEmail} />
                        <span className="form__field-error user-email-error"></span>
                    </label>
                    <label className="form__field-label">
                        <span className="form__field-label-text">Пароль</span>
                        <input type="password" className="form__field form__field_error" name="password" id="password" placeholder="Пароль" 
                            autoComplete="off" required value={password} onChange={handleChangePassword} />
                        <span className="form__field-error user-password-error">Неверный пароль</span>
                    </label>
                </fieldset>
                <button className="form__button" type="submit" aria-label={btnTitle}>{btnTitle}</button>
            </form>
            <div className="form__question">
                <p className="form__question-text">{question}&nbsp;</p>
                <Link to={linkRoute} className="form__link">{link}</Link>
            </div>
        </>
    );
}

export default Form;

