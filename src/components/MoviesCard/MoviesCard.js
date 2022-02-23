import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { BEATMOVIESAPI } from '../../utils/constants';
import { getTimeFromMins, getString } from '../../utils/MoviesDataStorage';

import './MoviesCard.css';

function MoviesCard({
    isSaved,
    movie,
    onSaveMovie,
    onDeleteMovie
}) {

    const currentUser = useContext(CurrentUserContext);

    const isOwn = movie.owner === currentUser?._id;

    const handleSave = () => {
        const movieChosen = {
            country: getString(movie.country),
            director: getString(movie.director),
            duration: movie.duration,
            year: movie.year,
            description: getString(movie.description),
            image: `${BEATMOVIESAPI}${movie.image.url}`,
            trailer: movie.trailerLink,
            thumbnail: `${BEATMOVIESAPI}${movie.image.formats.thumbnail.url}`,
            movieId: movie.id,
            nameRU: getString(movie.nameRU),
            nameEN: getString(movie.nameEN)
        };
        onSaveMovie(movieChosen);
    }

    const handleDelete = () => {
        onDeleteMovie(isSaved ? movie._id : movie.savedId);
    }

    return (
        <li className="movie-card">
            {!isSaved && !isOwn &&
                <button
                    className="movie-card__button movie-card__button_add"
                    type="button"
                    aria-label="Добавить фильм в сохраненные"
                    onClick={handleSave}>
                    Сохранить
                </button>}
            {!isSaved && isOwn &&
                <button
                    className="movie-card__button movie-card__button_saved"
                    type="button"
                    aria-label="Фильм сохранен"
                    onClick={handleDelete}>
                </button>}
            {isSaved &&
                <button
                    className="movie-card__button movie-card__button_delete"
                    type="button"
                    aria-label="Удалить фильм"
                    onClick={handleDelete}>
                </button>}
            <a
                href={!isSaved ? movie.trailerLink : movie.trailer}
                alt={`Ссылка на трейлер фильма ${movie.nameRU}`}
                target="_blank"
                className="movie-card__link">
                {isSaved && <div className="movie-card__image" style={{ backgroundImage: `url(${movie.image})` }}></div>}
                {!isSaved && <div className="movie-card__image" style={{ backgroundImage: `url(${BEATMOVIESAPI}${movie.image.url})` }}></div>}
                <div className="movie-card__text-container">
                    <h3 className="movie-card__title">{movie.nameRU}</h3>
                    <div className="movie-card__time">{getTimeFromMins(movie.duration)}</div>
                </div>
            </a>
        </li>
    );
}

export default MoviesCard;