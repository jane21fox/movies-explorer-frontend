import { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import * as MoviesPagination from '../../utils/MoviesPagination.js';
import { DESKTOP_RES, TABLET_RES } from '../../utils/constants';

import './MoviesCardList.css';

function MoviesCardList({
    isSaved,
    ApiMsg,
    movies,
    onSaveMovie,
    onDeleteMovie
}) {

    const [shownMovies, setShownMovies] = useState([]);
    const [screenState, setScreenState] = useState('desktop');
    const [moreMovies, setMoreMovies] = useState(false);

    useEffect(() => {
        if (!isSaved) {
            determineScreenState();
            const obj = MoviesPagination.setMovies(movies, shownMovies, screenState);
            setShownMovies(obj.data);
            setMoreMovies(obj.more);
        }
    }, [movies]);

    useEffect(() => {
        function handleResize() {
            setTimeout(determineScreenState(), 6000);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    const determineScreenState = () => {
        const { innerWidth: width } = window;
        setScreenState(width >= DESKTOP_RES ? 'desktop' : (width >= TABLET_RES ? 'tablet' : 'mobile'));
    };

    const handleMoreClick = () => {
        const obj = MoviesPagination.getMoreMovies(movies, shownMovies, screenState);
        setShownMovies(obj.data);
        setMoreMovies(obj.more);
    }

    return (
        <>
            <section className="movies">
                <div>
                    <ul className="movies__list">
                        {!isSaved && shownMovies.map(element => {
                            return (<MoviesCard
                                key={element.id}
                                isSaved={isSaved}
                                movie={element}
                                onSaveMovie={onSaveMovie}
                                onDeleteMovie={onDeleteMovie}
                            />)
                        })}
                        {isSaved && movies.map(element => {
                            return (<MoviesCard
                                key={element._id}
                                isSaved={isSaved}
                                movie={element}
                                onDeleteMovie={onDeleteMovie}
                            />)
                        })}
                    </ul>
                </div>
                {ApiMsg && <p className="movies__error">{ApiMsg}</p>}
            </section>
            {!isSaved && moreMovies &&
                <section className="movies-more">
                    <button
                        className="movies-more__button"
                        type="button"
                        aria-label="Загрузить еще фильмы"
                        onClick={handleMoreClick}>
                        Еще
                    </button>
                </section>
            }
        </>
    );
}

export default MoviesCardList;

