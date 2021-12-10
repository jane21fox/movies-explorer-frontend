import SectionTitle from '../SectionTitle/SectionTitle';
import { techs } from '../../../utils/constants';

import './Techs.css';

function Techs() {
    
    return (
        <section className="techs">
            <SectionTitle title="Технологии" mark="techs"/>
            <h3 className="techs__title">
                7 технологий
            </h3>
            <p className="techs__text">
                На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
            </p>
            <ul className="techs__list">
                {techs.map((element, index) => {
                    return (
                        <li key={index}>
                            <p className="techs__item">{element}</p>
                        </li>)
                })}
            </ul>
        </section>
    );
}

export default Techs;