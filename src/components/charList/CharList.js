import { useState, useEffect, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./charList.scss";

const CharList = (props) => {
    //props: onCharSelected={onCharSelected}

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const { loading, error, getAllCharacters } = useMarvelService(); // Из хука вытащил нужные

    useEffect(() => {
        onRequest(offset, true);
    }, []); // Выполнится только при создании компонента

    const onRequest = (offset, firstCall) => {
        firstCall ? setNewItemLoading(false) : setNewItemLoading(true);
        // Показали спиннер когда новые герои загружаются (newItemLoading: true), но только при первом вызове (firstCall: false) (помощь)
        getAllCharacters(offset).then(onCharListLoaded);
    }; // Получили массив всех персонажей через отступ offset() и установили в state (Главная)

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        } // Проверка на 9 последних персонажей и запись этого значения в charEnded
        setCharList((charList) => [...charList, ...newCharList]);
        setNewItemLoading(false);
        setOffset((offset) => offset + 9);
        setCharEnded(ended);
    }; // Устанавливает charList в state + Добавляет новых персонажей в charList при нажатии на кнопку "load more" (помощь)

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach((item) => item.classList.remove("char__item_selected"));
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
                <CSSTransition key={item.id} timeout={1000} classNames={"char__item"}>
                    <li
                        className="char__item"
                        tabIndex={0}
                        ref={(elem) => (itemRefs.current[i] = elem)}
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
                </CSSTransition>
            );
        });
        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>{items}</TransitionGroup>
            </ul>
        );
    } // Главный метод для оптимизации чтобы не помещать его в финальный return

    const items = renderItems(charList); // В items лежат li с героями

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null; // Это загрузка но не загрузка новых персонажей

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
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
