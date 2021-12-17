import Navigation from '../Navigation/Navigation';
import ProfileLink from '../ProfileLink/ProfileLink';
import { Link } from 'react-router-dom';

import './MenuPopup.css';

function MenuPopup({
    isOpen,
    onClose,
    loggedIn,
    pathName
}) {

    return (
        <div className={`popup ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button className="popup__close-button"
                    type="button" aria-label="Закрыть меню" onClick={onClose}></button>
                <Navigation loggedIn={loggedIn} pathName={pathName} isOpen={isOpen} onClick={onClose} />
                <Link to="/profile" className="popup__link" onClick={onClose} >
                    <ProfileLink />
                </Link>
            </div>
        </div>
    );
}

export default MenuPopup;

