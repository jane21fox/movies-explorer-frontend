import linkArrow from '../../../images/link-arrow.svg';
import './Portfolio.css';

function Portfolio() {

    return (
        <section className="portfolio">
            <p className="portfolio__title">Портфолио</p>
            <nav className="portfolio__nav">
                <ul className="portfolio__nav-items">
                    <li className="portfolio__nav-item">
                        <a href="https://github.com/jane21fox/how-to-learn" target="_blank" className="portfolio__link">
                            Статичный сайт
                            <img src={linkArrow} alt="Ссылка на статичный сайт" className="portfolio__image" />
                        </a>
                    </li>
                    <li className="portfolio__nav-item">
                        <a href="https://jane21fox.github.io/russian-travel/index.html" target="_blank" className="portfolio__link">
                            Адаптивный сайт
                            <img src={linkArrow} alt="Ссылка на адаптивный сайт" className="portfolio__image" />
                        </a>
                    </li>
                    <li className="portfolio__nav-item">
                        <a href="https://mesto-jane21fox.nomoredomains.xyz/" target="_blank" className="portfolio__link">
                            Одностраничное приложение
                            <img src={linkArrow} alt="Ссылка на одностраничное приложение" className="portfolio__image" />
                        </a>
                    </li>
                </ul>
            </nav>
        </section>
    );
}

export default Portfolio;