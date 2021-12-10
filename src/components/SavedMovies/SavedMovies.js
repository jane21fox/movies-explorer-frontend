import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesMore from '../MoviesMore/MoviesMore';
import Preloader from '../Preloader/Preloader';

import './SavedMovies.css';

function SavedMovies({ onSearchClick, isPreload }) {

    return (
        <main>
            <SearchForm onSearchClick={onSearchClick}/>
            {isPreload && <Preloader/>}
            {!isPreload && <MoviesCardList isSaved={true} />}
            {!isPreload && <MoviesMore/>}
        </main>
    );
}

export default SavedMovies;