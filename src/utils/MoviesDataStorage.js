import { SHORT_FILM_DURATION } from './constants.js';

export const setDataToStorage = (data, searchValue, isShort) => {
    const moviesObj = {
        data,
        searchValue,
        isShort
    }
    localStorage.BeatMoviesData = JSON.stringify(moviesObj);
};

export const getString = (str) => {
    return (str === "" || str === null ? "-" : str)
};

export const getTimeFromMins = (mins) => {
    if (!mins) mins = 0;
    const hours = Math.trunc(mins / 60);
    const minutes = mins % 60;
    return `${hours}ч ${minutes}м`;
};

export const filterMovies = async (dataMovies, searchValue, isShort) => {
    return dataMovies.filter((movie) => {
        if (isShort && movie.duration > SHORT_FILM_DURATION) return false;
        else if (movie.nameRU.toUpperCase().includes(searchValue.toUpperCase())) return true;
        return false;
    });
};

export const setMoviesOwner = async (dataMovies, savedMovies) => {
    return dataMovies.map((movie) => {
        movie.owner = '';
        movie.savedId = null;
        savedMovies.forEach((item) => {
            if (item.movieId === movie.id) {
                movie.owner = item.owner._id;
                movie.savedId = item._id;
            }
        });
        return movie;
    });
};

export const addSavedMovies = async (savedMovies, savedMovie) => {
    savedMovie.owner = { _id: savedMovie.owner };
    savedMovies.push(savedMovie);
    return savedMovies;
};

export const deleteSavedMovies = async (savedMovies, deletedMovie) => {
    return savedMovies.filter((movie) => {
        if (movie._id === deletedMovie._id) return false;
        return true;
    });
};

