import './SectionTitle.css';

function SectionTitle({ title, mark }) {
    return (
        <div className="section-title">
            <h2 className="section-title__text"><a className="section-title__link" href={`#${mark}`} name={mark}>{title}</a></h2>
        </div>
    );
}

export default SectionTitle;