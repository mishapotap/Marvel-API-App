import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./comicsList.scss";

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { loading, error, getAllComics } = useMarvelService(); // Из хука вытащил нужные

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Выполнится только при создании компонента

    const onRequest = (offset, firstCall) => {
        firstCall ? setNewItemLoading(false) : setNewItemLoading(true);
        // Показали спиннер когда новые герои загружаются (newItemLoading: true), но только при первом вызове (initialCall: false) (помощь)
        getAllComics(offset).then(onComicsListLoaded);
    }; // Получили массив всех персонажей через отступ offset() и установили в state (Главная)

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        } // Проверка на 8 последних комиксов и запись этого значения в comicsEnded
        setComicsList((comicsList) => [...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset((offset) => offset + 8);
        setComicsEnded(ended);
    }; // Устанавливает comicsList в state + Добавляет новых персонажей в comicsList при нажатии на кнопку "load more" (помощь)

    function renderComics(arr) {
        const items = arr.map((item, i) => {
            return (
                <li className="comics__item" tabIndex={0} key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img" />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            );
        });
        return <ul className="comics__grid">{items}</ul>;
    } // Главный метод для оптимизации чтобы не помещать его в финальный return

    const items = renderComics(comicsList); // В items лежат li с комиксами

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null; // Это загрузка но не загрузка новых комиксов

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button
                disabled={newItemLoading}
                style={{ display: comicsEnded ? "none" : "block" }}
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

export default ComicsList;
