import './NavTab.css';

function NavTab() {
    
    return (
        <section className="nav-tab">
            <div className="nav-tab__image">
                <h1 className="nav-tab__text">Учебный проект студента факультета Веб-разработки.</h1>
                <nav className="nav-tab__nav">
                    <ul className="nav-tab__nav-items">
                        <li> 
                            <a href="#about-project" className="nav-tab__link">
                                О проекте
                            </a>
                        </li>
                        <li> 
                            <a href="#techs" className="nav-tab__link">
                                Технологии
                            </a>
                        </li>
                        <li> 
                            <a href="#about-me" className="nav-tab__link">
                                Студент
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
    );
}

export default NavTab;

