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

    function handleChangeShort () {
        setIsShort(!isShort);
    }

    function handleChangeSearchValue(e) {
        setsearchValue(e.target.value);
    }

    function handleSubmit() {
        // onSearchClick();
    }

    return (
        <section className="searchform">
            <div className="searchform__container">
                <div className="searchform__form">
                    <img src={find} alt="Поле поиска фильма" className="searchform__logo" />
                    <input className="searchform__text" type="text" placeholder="Фильм"
                        value={searchValue} onChange={handleChangeSearchValue}></input>
                    <button className="searchform__button" type="button" aria-label="Найти фильм" 
                        onClick={handleSubmit}>Найти</button>
                </div>
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

