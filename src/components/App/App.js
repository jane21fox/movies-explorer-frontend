import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
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
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './App.css';

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  // const [userData, setUserData] = useState({});
  const [loggedIn, setLoggedIn] = useState(true);
  const [isMenuPopupOpen, setIsMenuPopupOpen] = useState(false);
  const [isErrorMsgOpen, setIsErrorMsgOpen] = useState(false);
  const [isPreload, setIsPreload] = useState(false);

  useEffect(() => {
    if(loggedIn) {
      const userData = {
        "_id": "619d0ce258f38f2b44ed44c1",
        "name": "Евгения",
        "email": "jane@gmail.com",
      }  
      setCurrentUser(userData);
      // setUserData({
      //   _id: userData._id,
      //   email: userData.email
      // });
      // setCards(cards);
    }
  }, [loggedIn]);

  function handleMenuClick() {
    setIsMenuPopupOpen(true);
  }

  // function handleErrorMsg() {
  //   setIsErrorMsgOpen(true);
  // }

  function closeAllPopups() {
    setIsMenuPopupOpen(false);
    setIsErrorMsgOpen(false);
  }

  function handleMoviesLoading() {
    setIsPreload(true);
  }

  const onSignOut = () => {
    // localStorage.removeItem('token');
    setLoggedIn(false);
    // setUserData({});
};

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="container">
        <Router>
            <Switch>
              <Route exact path="/">
                <Header loggedIn={loggedIn} onOpenMenu={handleMenuClick} isOpen={isMenuPopupOpen} onClose={closeAllPopups} />
                <Main />
                <Footer />
              </Route>
              <Route exact path="/sign-in">
                <Login/>
              </Route>
              <Route exact path="/sign-up">
                <Register />
              </Route>
              <Route exact path="/movies">
                <Header loggedIn={loggedIn} onOpenMenu={handleMenuClick} isOpen={isMenuPopupOpen} onClose={closeAllPopups} />
                <Movies onSearchClick={handleMoviesLoading} isPreload={isPreload} />
                <Footer />
              </Route>
              <Route exact path="/saved-movies">
                <Header loggedIn={loggedIn} onOpenMenu={handleMenuClick} isOpen={isMenuPopupOpen} onClose={closeAllPopups} />
                <SavedMovies onSearchClick={handleMoviesLoading} isPreload={isPreload} />
                <Footer />
              </Route>
              <Route exact path="/profile">
                <Header loggedIn={loggedIn} onOpenMenu={handleMenuClick} isOpen={isMenuPopupOpen} onClose={closeAllPopups} />
                <Profile onSignOut={onSignOut} />
              </Route>
              <Route path="*">
                <PageNotFound />
              </Route>
            </Switch>
        </Router>
        <ErrorMsg isOpen={isErrorMsgOpen} onClose={closeAllPopups} />
    </div>
    </CurrentUserContext.Provider>
);
}

export default App;
