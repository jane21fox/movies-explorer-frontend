import { Link } from 'react-router-dom';

import './Form.css';

function Form({
    formName,
    btnTitle,
    question,
    link,
    linkRoute,
    values,
    errors,
    isValid,
    handleChange,
    handleSubmit,
    ApiMsg
}) {

    return (
        <>
            <form className="form__container" name={formName} onSubmit={handleSubmit}>
                <fieldset className="form__info">
                    {formName === "register" && <label className="form__field-label">
                        <span className="form__field-label-text">Имя</span>
                        <input
                            type="text"
                            className={`form__field ${errors.name !== "" && "form__field_notvalid"}`}
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
                        <span className="form__field-error">{errors.name}</span>
                    </label>}
                    <label className="form__field-label">
                        <span className="form__field-label-text">E-mail</span>
                        <input
                            type="email"
                            className={`form__field ${errors.email !== "" && "form__field_notvalid"}`}
                            name="email"
                            id="email"
                            placeholder="Email"
                            autoComplete="off"
                            required
                            value={values.email}
                            onChange={handleChange} />
                        <span className="form__field-error">{errors.email}</span>
                    </label>
                    <label className="form__field-label">
                        <span className="form__field-label-text">Пароль</span>
                        <input
                            type="password"
                            className={`form__field ${errors.password !== "" && "form__field_notvalid"}`}
                            name="password"
                            id="password"
                            placeholder="Пароль"
                            autoComplete="off"
                            required
                            minLength="8"
                            value={values.password}
                            onChange={handleChange} />
                        <span className="form__field-error">{errors.password}</span>
                    </label>
                </fieldset>
                <span className="form__field-apierror">{ApiMsg}</span>
                <button
                    className={`form__button ${!isValid && "form__button_disabled"}`}
                    disabled={!isValid}
                    type="submit"
                    aria-label={btnTitle}>
                    {btnTitle}
                </button>
            </form>
            <div className="form__question">
                <p className="form__question-text">{question}&nbsp;</p>
                <Link to={linkRoute} className="form__link">{link}</Link>
            </div>
        </>
    );
}

export default Form;

