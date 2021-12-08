import SectionTitle from '../SectionTitle/SectionTitle';
import Promo from '../Promo/Promo';

import './AboutProject.css';

function AboutProject() {
    
    return (
        <section className="about">
            <SectionTitle title="О проекте" mark="about-project"/>
            <ul className="about__info">
                <li>
                    <h3 className="about__heading">Дипломный проект включал 5 этапов</h3>
                    <p className="about__text">
                        Составление плана, работу над бэкендом, вёрстку, 
                        добавление функциональности и финальные доработки.
                    </p>
                </li>
                <li>
                    <h3 className="about__heading">На выполнение диплома ушло 5 недель</h3>
                    <p className="about__text">
                        У каждого этапа был мягкий и жёсткий дедлайн, 
                        которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </li>
            </ul>
            <Promo/>
        </section>
    );
}

export default AboutProject;