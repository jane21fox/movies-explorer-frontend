import find from '../../images/find.svg';

import './SearchForm.css';

function SearchForm({
    onFilterMovies,
    isShort,
    setIsShort,
    setSearchValue,
    values,
    handleChange,
    errors,
    isValid
}) {

    const getActualIsShort = () => {
        return !isShort;
    }

    const handleChangeShort = (e) => {
        setIsShort(!isShort);
        if (isValid) onFilterMovies(values.searchValue, getActualIsShort());
    }

    const handleSubmit = (e, actualIsShort = isShort) => {
        e.preventDefault();

        setSearchValue(values.searchValue);
        onFilterMovies(values.searchValue, actualIsShort);
    }

    return (
        <section className="searchform">
            <div className="searchform__container">
                <form className="searchform__form" onSubmit={handleSubmit}>
                    <img src={find} alt="Поле поиска фильма" className="searchform__logo" />
                    <fieldset className="searchform__info">
                        <input
                            className="searchform__text"
                            type="text"
                            name="searchValue"
                            placeholder="Фильм"
                            required
                            autoComplete="off"
                            value={values.searchValue}
                            onChange={handleChange}>
                        </input>
                    </fieldset>
                    <button
                        className={`searchform__button ${!isValid && "searchform__button_disabled"}`}
                        disabled={!isValid}
                        type="submit"
                        aria-label="Найти фильм">
                        Найти
                    </button>
                </form>
                <div className="searchform__filter">
                    <label className="searchform__label">
                        <input className="searchform__checkbox" checked={isShort} type="checkbox"
                            onChange={handleChangeShort}></input>
                        <span className="searchform__visible-checkbox"></span>
                    </label>
                    <span className="searchform__label-text">Короткометражки</span>
                </div>
            </div>
            <span className="searchform__field-error">{errors.searchValue !== "" && "Нужно ввести ключевое слово"}</span>
            <div className="searchform__line"></div>
        </section>
    );
}

export default SearchForm;

