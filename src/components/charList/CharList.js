import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./charList.scss";

const CharList = (props) => {
    //props: onCharSelected={onCharSelected}

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService(); // Получили новый экземпляр объекта который конструируется при помощи класса MarvelService

    useEffect(() => {
        onRequest();
    }, []); // Выполнится только при создании компонента

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService.getAllCharacters(offset).then(onCharListLoaded).catch(onError);
    }; // Главная (Получили массив всех персонажей через отступ offset() и установили в state. В конце сделали catch ошибки

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }; // Показали что новые герои загружаются (newItemLoading: true) (помощь)

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        } // Проверка на 9 последних персонажей и запись этого значения в charEnded
        setCharList((charList) => [...charList, ...newCharList]);
        setLoading(false);
        setNewItemLoading(false);
        setOffset((offset) => offset + 9);
        setCharEnded(ended);
    }; // Устанавливает charList в state + Добавляет новых персонажей в charList при нажатии на кнопку "load more" (помощь)

    const onError = () => {
        //сделал
        setLoading(false);
        setError(true);
    }; // Устанавливает ошибку в state (помощь)

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove("char__item_selected"));
        itemRefs.current[id].classList.add("char__item_selected");
        itemRefs.current[id].focus();
    }; // Фокус на элементе

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = { objectFit: "cover" };
            if (
                item.thumbnail ===
                "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
            ) {
                imgStyle = { objectFit: "unset" };
            } // Центрирование картинки not available

            return (
                <li
                    className="char__item"
                    tabIndex={0}
                    ref={(elem) => (itemRefs.current[i] = elem)}
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}
                >
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            );
        });
        return <ul className="char__grid">{items}</ul>;
    } // Главный метод для оптимизации чтобы не помещать его в рендер

    const items = renderItems(charList); // В items лежат li с героями

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;
    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button
                disabled={newItemLoading}
                style={{ display: charEnded ? "none" : "block" }}
                onClick={() => {
                    onRequest(offset);
                }}
                className="button button__main button__long"
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};
CharList.propTypes = {
    onCharSelected: PropTypes.func,
}; // Проверка пропсов на тип (если нам вернется не функция то в терминале будет уведомление)

export default CharList;
