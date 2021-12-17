import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import PageNotFound from '../PageNotFound/PageNotFound';
import ErrorMsg from '../ErrorMsg/ErrorMsg';
import * as MainApi from '../../utils/MainApi.js';
import * as MoviesApi from '../../utils/MoviesApi.js';
import * as MoviesDataStorage from '../../utils/MoviesDataStorage.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './App.css';

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const [isMenuPopupOpen, setIsMenuPopupOpen] = useState(false);
  const [isErrorMsgOpen, setIsErrorMsgOpen] = useState(false);
  const [isPreload, setIsPreload] = useState(false);

  const [ErrorMessage, setErrorMessage] = useState({});

  const [dataMoviesFiltered, setDataMoviesFiltered] = useState([]);
  const [isShort, setIsShort] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [savedMovies, setSavedMovies] = useState([]);
  const [isShortSM, setIsShortSM] = useState(false);
  const [searchValueSM, setSearchValueSM] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth(token)
    }
  }, [loggedIn]);

  const auth = async (token) => {
    return MainApi.checkToken(token)
      .then((data) => {
        if (data) {
          setLoggedIn(true);
          setCurrentUser(data);
          setUserData({
            _id: data._id,
            email: data.email
          });
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
      });
  };

  const onRegister = async ({ name, password, email }) => {
    return MainApi.register(name, password, email)
      .then((res) => {
        return res;
      });
  }

  const onLogin = async ({ password, email }) => {
    return MainApi.authorize(password, email)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem('token', res.token);
        }
      });
  }

  const onSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('BeatMoviesData');
    localStorage.removeItem('BeatMoviesDataFull');
    resetAccount();
  };

  const onProfile = async ({ name, email }) => {
    return MainApi.setUserInfo(name, email)
      .then((data) => {
        setCurrentUser(data);
        setUserData({
          _id: userData._id,
          email: userData.email
        });
        return data;
      });
  }

  const getBeatMovies = async () => {
    const localStorageData = localStorage.getItem('BeatMoviesDataFull');
    if (localStorageData)
      return JSON.parse(localStorageData);
    else
      return MoviesApi.getBeatMovies()
        .then((data) => {
          localStorage.setItem('BeatMoviesDataFull', JSON.stringify(data));
          return data;
        });
  }

  const onGetSavedMovies = async () => {
    return MainApi.getSavedMovies()
      .then((data) => {
        if (data) {
          setSavedMovies(data);
        }
        return data;
      })
  }

  const onSaveMovie = async (movie) => {
    return MainApi.saveMovie(movie)
      .then((savedMovie) => {
        return MoviesDataStorage.addSavedMovies(savedMovies, savedMovie);
      })
      .then((savedMovies) => {
        setSavedMovies(savedMovies);
        return savedMovies;
      });
  }

  const onDeleteMovie = async (id) => {
    return MainApi.deleteMovie(id)
      .then((deletedMovie) => {
        return MoviesDataStorage.deleteSavedMovies(savedMovies, deletedMovie);
      })
      .then((savedMovies) => {
        setSavedMovies(savedMovies);
        return savedMovies;
      });
  }

  function resetAccount() {
    setLoggedIn(false);
    setUserData({});
    setDataMoviesFiltered([]);
    setIsShort(false);
    setSearchValue('');
    setSavedMovies([]);
    setIsShortSM(false);
    setSearchValueSM('');
  }

  function handleMenuClick() {
    setIsMenuPopupOpen(true);
  }

  function handleErrorMsg(err) {
    setErrorMessage(err);
    setIsErrorMsgOpen(true);
  }

  function closeAllPopups() {
    setIsMenuPopupOpen(false);
    setIsErrorMsgOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="container">
        <Router>
          <Header loggedIn={loggedIn} onOpenMenu={handleMenuClick} isOpen={isMenuPopupOpen} onClose={closeAllPopups} />
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route exact path="/sign-in">
              <Login onLogin={onLogin} />
            </Route>
            <Route exact path="/sign-up">
              <Register onRegister={onRegister} onLogin={onLogin} />
            </Route>
            <ProtectedRoute
              path="/movies"
              component={Movies}
              loggedIn={loggedIn}
              isPreload={isPreload}
              setIsPreload={setIsPreload}
              onError={handleErrorMsg}
              onGetMovies={getBeatMovies}
              onGetSavedMovies={onGetSavedMovies}
              onSaveMovie={onSaveMovie}
              onDeleteMovie={onDeleteMovie}
              savedMovies={savedMovies}
              setSavedMovies={setSavedMovies}
              dataMoviesFiltered={dataMoviesFiltered}
              setDataMoviesFiltered={setDataMoviesFiltered}
              isShort={isShort}
              setIsShort={setIsShort}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              loggedIn={loggedIn}
              isPreload={isPreload}
              setIsPreload={setIsPreload}
              onError={handleErrorMsg}
              onDeleteMovie={onDeleteMovie}
              savedMovies={savedMovies}
              onGetSavedMovies={onGetSavedMovies}
              dataMoviesFiltered={dataMoviesFiltered}
              setDataMoviesFiltered={setDataMoviesFiltered}
              isShort={isShort}
              searchValue={searchValue}
              isShortSM={isShortSM}
              setIsShortSM={setIsShortSM}
              setSearchValueSM={setSearchValueSM}
            />
            <ProtectedRoute
              path="/profile"
              component={Profile}
              loggedIn={loggedIn}
              onSignOut={onSignOut}
              onProfile={onProfile}
            />
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
          <Footer />
        </Router>
        <ErrorMsg isOpen={isErrorMsgOpen} onClose={closeAllPopups} ErrorMessage={ErrorMessage} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
