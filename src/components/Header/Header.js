import logo from '../../images/header-logo.svg';
import menu from '../../images/menu.svg';
import Navigation from '../Navigation/Navigation';
import ProfileLink from '../ProfileLink/ProfileLink';
import MenuPopup from '../MenuPopup/MenuPopup';
import { Link, useLocation } from 'react-router-dom';

import './Header.css';

function Header({
    loggedIn,
    onOpenMenu,
    isOpen,
    onClose
}) {

    const { pathname } = useLocation();

    return (
        <>
            {(pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile') &&
                <>
                    <header className="header">
                        <Link to="/" className="header__link header__link_logo">
                            <img src={logo} alt="Логотип" className="header__logo" />
                        </Link>
                        {loggedIn && !isOpen &&
                            <Navigation loggedIn={loggedIn} pathName={pathname} isOpen={isOpen} />}
                        <div className="header__container">
                            <nav className="header__auth">
                                <ul className="header__auth-items">
                                    {!loggedIn && pathname === "/" && <li>
                                        <Link to="/sign-up" className="header__link">
                                            Регистрация
                                        </Link>
                                    </li>}
                                    {!loggedIn && pathname === "/" && <li>
                                        <Link to="/sign-in" className="header__link-button">
                                            Войти
                                        </Link>
                                    </li>}
                                </ul>
                            </nav>
                            {loggedIn && <img src={menu} alt="Меню" className="header__menu" onClick={onOpenMenu} />}
                            {loggedIn &&
                                <Link to="/profile" className="header__link header__link_profile">
                                    <ProfileLink />
                                </Link>}
                        </div>
                    </header>
                    <MenuPopup isOpen={isOpen} onClose={onClose} loggedIn={loggedIn} pathName={pathname} classContainer="navigation-menu" />
                </>
            }
        </>
    );
}

export default Header;