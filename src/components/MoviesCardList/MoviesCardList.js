import { useContext } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { movies } from '../../utils/constants';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './MoviesCardList.css';

function MoviesCardList({ isSaved }) {
    
    const currentUser = useContext(CurrentUserContext);
    
    return (
        <section className="movies">
            <div>
                <ul className="movies__list">
                {!isSaved && movies.map(element => {
                    return <MoviesCard key={element._id} isSaved={isSaved} movie={element}/>
                })}
                {isSaved && movies.map(element => {
                    if (element.owner === currentUser?._id) 
                        return (<MoviesCard key={element._id} isSaved={isSaved} movie={element}/>)
                })}
                </ul>
            </div>
        </section>
    );
}

export default MoviesCardList;

