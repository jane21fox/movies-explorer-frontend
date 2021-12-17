import './ErrorMsg.css';

function ErrorMsg({ isOpen, onClose, ErrorMessage }) {

    const message = JSON.stringify(ErrorMessage);

    return (
        <div className={`err-msg ${isOpen && 'err-msg_opened'}`}>
            <div className="err-msg__container">
                <button className="err-msg__close-button"
                    type="button" aria-label="Закрыть cообщение" onClick={onClose}></button>
                <h2 className="err-msg__title">Ошибка</h2>
                <p className="err-msg__text">{message}</p>
            </div>
        </div>
    );
}

export default ErrorMsg;

