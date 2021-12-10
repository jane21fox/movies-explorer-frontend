import './ErrorMsg.css';

function ErrorMsg(props) {

    return (
        <div className={`err-msg ${props.isOpen && 'err-msg_opened'}`}>
            <div className="err-msg__container">
                <button className="err-msg__close-button" 
                    type="button" aria-label="Закрыть cообщение" onClick={props.onClose}></button>
                <p className="err-msg__text">Текст ошибки от сервера</p>
            </div>
        </div>
    );
}

export default ErrorMsg;

