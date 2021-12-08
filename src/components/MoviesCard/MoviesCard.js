import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './MoviesCard.css';

function MoviesCard({ isSaved, movie }) {

    const currentUser = useContext(CurrentUserContext);

    const isOwn = movie.owner === currentUser?._id;
   
    return (
        <li className="movie-card">
            {!isSaved && !isOwn && 
                <button className={`movie-card__button movie-card__button_add`} type="button" 
                    aria-label="Добавить фильм в сохраненные">
                    Сохранить
                </button>}
            {!isSaved && isOwn && 
                <button className={`movie-card__button movie-card__button_saved`} type="button" 
                    aria-label="Фильм сохранен">
                </button>}
            {isSaved && 
                <button className={`movie-card__button movie-card__button_delete`} type="button" 
                    aria-label="Удалить фильм">
                </button>}
            <div className="movie-card__image" style={{ backgroundImage: `url(${movie.image})` }}></div>
            <div className="movie-card__text-container">
                <h3 className="movie-card__title">{movie.nameRU}</h3>
                <div className="movie-card__time">
                    1ч 17м
                </div>
            </div>
        </li>
    );
}

export default MoviesCard;