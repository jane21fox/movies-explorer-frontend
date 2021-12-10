import { useState, useEffect } from 'react';
import find from '../../images/find.svg';

import './SearchForm.css';

function SearchForm({ onSearchClick }) {

    const [isShort, setIsShort] = useState(false);
    const [searchValue, setsearchValue] = useState("");

    useEffect(() => {
        resetForm();
    }, []);

    const resetForm = () => {
        setIsShort(false);
        setsearchValue("");
    };

    const handleChangeShort = () => {
        setIsShort(!isShort);
    }

    const handleChangeSearchValue = (e) => {
        setsearchValue(e.target.value);
    }

    const handleSubmit = (e) => {
        console.log(e);
        e.preventDefault();
        // onSearchClick();
    }

    return (
        <section className="searchform">
            <div className="searchform__container">
                <form className="searchform__form" onSubmit={handleSubmit}>
                    <img src={find} alt="Поле поиска фильма" className="searchform__logo" />
                    <fieldset className="searchform__info">
                        <input className="searchform__text" type="text" placeholder="Фильм" required
                            value={searchValue} onChange={handleChangeSearchValue}></input>
                    </fieldset>
                    <button className="searchform__button" type="submit" aria-label="Найти фильм">Найти</button>
                </form>
                <div className="searchform__filter">
                    <label className="searchform__label">
                        <input className="searchform__checkbox" type="checkbox"
                            onChange={handleChangeShort}></input>
                        <span className="searchform__visible-checkbox"></span>
                    </label>
                    <span className="searchform__label-text">Короткометражки</span>
                </div>
            </div>
            <div className="searchform__line"></div>
        </section>
    );
}

export default SearchForm;

