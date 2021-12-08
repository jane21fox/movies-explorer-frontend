import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesMore from '../MoviesMore/MoviesMore';
import Preloader from '../Preloader/Preloader';

import './Movies.css';

function Movies({ onSearchClick, isPreload }) {

    return (
        <main>
            <SearchForm onSearchClick={onSearchClick} />
            {isPreload && <Preloader/>}
            {!isPreload && <MoviesCardList isSaved={false}/>}
            {!isPreload && <MoviesMore/>}
        </main>
    );
}

export default Movies;