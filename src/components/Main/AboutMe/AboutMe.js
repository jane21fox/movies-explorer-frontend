import SectionTitle from '../SectionTitle/SectionTitle';
import me from '../../../images/me.jpg';

import './AboutMe.css';

function AboutMe() {

    return (
        <section className="about-me">
            <SectionTitle title="Студент" mark="about-me" />
            <div className="about-me__info-container">
                <div className="about-me__info">
                    <h3 className="about-me__title">Евгения</h3>
                    <p className="about-me__subtitle">Фронтенд-разработчик, 35 лет</p>
                    <p className="about-me__text">
                        Я родилась и живу в Ярославле, закончила факультет ИВТ ЯрГУ, работаю по специальности.
                        Я люблю путешествовать в северные страны, увлекаюсь фотографией. Курс прошла для получения
                        базовых знаний в сфере веб-разработки. Планирую затем сменить текущее место работы.
                    </p>
                    <nav className="about-me__nav">
                        <ul className="about-me__nav-items">
                            <li>
                                <a href="https://github.com/jane21fox" target="_blank" className="about-me__link">
                                    Github
                                </a>
                            </li>
                            <li>
                                <a href="https://facebook.com" target="_blank" className="about-me__link">
                                    Facebook
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <img className="about-me__image" src={me} alt="Фото студента" />
            </div>
        </section>
    );
}

export default AboutMe;