import { Link } from 'react-router-dom';

import './Navigation.css';

function Navigation({
    loggedIn,
    pathName,
    isOpen,
    onClick
}) {

    return (
        <>
            {loggedIn &&
                <nav className={isOpen ? "navigation-menu" : "navigation"}>
                    <ul className={isOpen ? "navigation__items-menu" : "navigation__items"}>
                        {isOpen && <li>
                            <Link to="/" className={`navigation__link-menu ${pathName === "/" && "navigation__link-menu_active"}`}
                                onClick={onClick}>
                                Главная
                            </Link>
                        </li>}
                        <li>
                            <Link to="/movies" className={`${isOpen ? "navigation__link-menu" : "navigation__link"} 
                            ${pathName === "/movies" && (isOpen ? "navigation__link-menu_active" : "navigation__link_active")}`}
                                onClick={onClick}>
                                Фильмы
                            </Link>
                        </li>
                        <li>
                            <Link to="/saved-movies" className={`${isOpen ? "navigation__link-menu" : "navigation__link"} 
                            ${pathName === "/saved-movies" && (isOpen ? "navigation__link-menu_active" : "navigation__link_active")}`}
                                onClick={onClick}>
                                Сохраненные фильмы
                            </Link>
                        </li>
                    </ul>
                </nav>}
        </>
    );
}

export default Navigation;

