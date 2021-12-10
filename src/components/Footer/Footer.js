import './Footer.css';

function Footer() {
    
    return (
        <footer className="footer">
            <p className="footer__text footer__text_info">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__container">
                <p className="footer__text">© 2021</p>
                <nav className="footer__nav">
                    <ul className="footer__nav-items">
                        <li> 
                            <a href="https://practicum.yandex.ru" target="_blank" className="footer__link">
                                Яндекс.Практикум
                            </a>
                        </li>
                        <li> 
                            <a href="https://github.com/jane21fox" target="_blank" className="footer__link">
                                Github
                            </a>
                        </li>
                        <li> 
                            <a href="https://facebook.com" target="_blank" className="footer__link">
                                Facebook
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;

