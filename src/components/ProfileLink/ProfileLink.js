import profile from '../../images/profile.svg';

import './ProfileLink.css';

function ProfileLink() {

    return (
        <>
            Аккаунт
            <div className="profile-link">
                <img src={profile} alt="Профайл" className="profile-image" />
            </div>
        </>
    );
}

export default ProfileLink;

