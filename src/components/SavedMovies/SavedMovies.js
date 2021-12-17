import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import * as MoviesDataStorage from '../../utils/MoviesDataStorage.js';
import { NO_RESULTS, SEARCH_ERROR } from '../../utils/constants.js';
import { useFormWithValidation } from '../UseFormWithValidation/UseFormWithValidation';

import './SavedMovies.css';

function SavedMovies({
    isPreload,
    setIsPreload,
    onError,
    onDeleteMovie,
    savedMovies,
    onGetSavedMovies,
    dataMoviesFiltered,
    setDataMoviesFiltered,
    isShort,
    searchValue,
    isShortSM,
    setIsShortSM,
    setSearchValueSM
}) {

    const [ApiMsg, setApiMsg] = useState('');
    const [savedMoviesFiltered, setSavedMoviesFiltered] = useState([]);
    const { values, handleChange, errors, isValid } = useFormWithValidation({
        searchValue: ''
    }, {
        searchValue: ''
    });

    useEffect(() => {
        if (savedMovies.length === 0)
            onGetSavedMovies()
                .then((data) => {
                    setSavedMoviesFiltered(data);
                })
                .catch(() => {
                    setApiMsg(SEARCH_ERROR);
                });
        else setSavedMoviesFiltered(savedMovies);
    }, []);

    const handleFilterMovies = (searchValue, isShort) => {
        setIsPreload(true);
        return MoviesDataStorage.filterMovies(savedMovies, searchValue, isShort)
            .then((dataFiltered) => {
                setIsPreload(false);
                setApiMsg(dataFiltered.length === 0 ? NO_RESULTS : '');
                setSavedMoviesFiltered(dataFiltered);
            })
            .catch((err) => {
                setIsPreload(false);
                setApiMsg(SEARCH_ERROR);
            });
    };

    const handleDeleteMovie = (id) => {
        onDeleteMovie(id)
            .then((data) => {
                setSavedMoviesFiltered(data);
                return MoviesDataStorage.setMoviesOwner(dataMoviesFiltered, data);
            })
            .then((dataFiltered) => {
                setApiMsg(dataFiltered.length === 0 ? NO_RESULTS : '');
                MoviesDataStorage.setDataToStorage(dataFiltered, searchValue, isShort);
                setDataMoviesFiltered(dataFiltered);
            })
            .catch((err) => {
                onError(err);
            });
    };

    return (
        <main>
            <SearchForm
                onFilterMovies={handleFilterMovies}
                isShort={isShortSM}
                setIsShort={setIsShortSM}
                setSearchValue={setSearchValueSM}
                values={values}
                handleChange={handleChange}
                errors={errors}
                isValid={isValid}
            />
            {isPreload && <Preloader />}
            {!isPreload && <MoviesCardList
                isSaved={true}
                ApiMsg={ApiMsg}
                movies={savedMoviesFiltered}
                onDeleteMovie={handleDeleteMovie}
            />}
        </main>
    );
}

export default SavedMovies;