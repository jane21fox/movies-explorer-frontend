import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import * as MoviesDataStorage from '../../utils/MoviesDataStorage.js';
import { NO_RESULTS, SEARCH_ERROR } from '../../utils/constants.js';
import { useFormWithValidation } from '../UseFormWithValidation/UseFormWithValidation';

import './Movies.css';

function Movies({
    isPreload,
    setIsPreload,
    onError,
    onGetMovies,
    onGetSavedMovies,
    onSaveMovie,
    onDeleteMovie,
    savedMovies,
    setSavedMovies,
    dataMoviesFiltered,
    setDataMoviesFiltered,
    isShort,
    setIsShort,
    searchValue,
    setSearchValue
}) {

    const [ApiMsg, setApiMsg] = useState('');
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation({
        searchValue: ''
    }, {
        searchValue: ''
    });

    // при монтировании компонента производится проверка на наличие данных о фильмах в localStorage
    useEffect(() => {
        const localStorageData = localStorage.getItem('BeatMoviesData');
        if (localStorageData) {
            const localStorageDataParsed = JSON.parse(localStorageData);
            setDataMoviesFiltered(localStorageDataParsed.data);
            setIsShort(localStorageDataParsed.isShort);
            setSearchValue(localStorageDataParsed.searchValue);
            setApiMsg(localStorageDataParsed.data.length === 0 ? NO_RESULTS : '');
            resetForm({
                searchValue: localStorageDataParsed.searchValue
            }, {
                searchValue: ''
            },
                true);
        }
        //  если данные о сохраненных фильмах еще не загружены
        if (savedMovies.length === 0)
            onGetSavedMovies()
                .then((data) => {
                    setSavedMovies(data);
                })
                .catch(() => {
                    setApiMsg(SEARCH_ERROR);
                });
    }, []);

    const handleFilterMovies = (searchValue, isShort) => {
        setIsPreload(true);
        onGetMovies()
            .then((data) => {
                return MoviesDataStorage.filterMovies(data, searchValue, isShort);
            })
            .then((data) => {
                return MoviesDataStorage.setMoviesOwner(data, savedMovies);
            })
            .then((dataFiltered) => {
                setIsPreload(false);
                setApiMsg(dataFiltered.length === 0 ? NO_RESULTS : '');
                MoviesDataStorage.setDataToStorage(dataFiltered, searchValue, isShort);
                setDataMoviesFiltered(dataFiltered);
            })
            .catch((err) => {
                setIsPreload(false);
                setApiMsg(SEARCH_ERROR);
            });
    };

    const handleSaveMovie = (movie) => {
        onSaveMovie(movie)
            .then((data) => {
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

    const handleDeleteMovie = (id) => {
        onDeleteMovie(id)
            .then((data) => {
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
                isShort={isShort}
                setIsShort={setIsShort}
                setSearchValue={setSearchValue}
                values={values}
                handleChange={handleChange}
                errors={errors}
                isValid={isValid}
                isSaved={false}
            />
            {isPreload && <Preloader />}
            {!isPreload && <MoviesCardList
                isSaved={false}
                ApiMsg={ApiMsg}
                movies={dataMoviesFiltered}
                onSaveMovie={handleSaveMovie}
                onDeleteMovie={handleDeleteMovie}
            />}
        </main>
    );
}

export default Movies;