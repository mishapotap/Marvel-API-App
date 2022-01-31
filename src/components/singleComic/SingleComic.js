import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./singleComic.scss";

const SingleComic = () => {
    const { comicId } = useParams(); // Вытащил comicId из параметров
    const [comic, setComic] = useState(null);
    const { loading, error, getComic, clearError } = useMarvelService(); // Из хука вытащил нужные

    useEffect(() => {
        updateComic();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comicId]); // Сработает при mount и при обновлении comicId

    const updateComic = () => {
        if (!comicId) {
            return;
        }
        clearError();
        getComic(comicId).then(onComicLoaded);
    }; // Главный метод (нет спиннера и catch потому что они внутри хука useMarvelService)

    const onComicLoaded = (comic) => {
        setComic(comic);
    }; // Устанавливает комикс в state (помощь)

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null;
    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    );
};
const View = ({ comic }) => {
    const { title, description, pageCount, thumbnail, language, price } = comic; // Деструктуризация объекта comic
    return (
        <div className="single-comic">
            <HelmetProvider>
                <Helmet>
                    <meta name="description" content={`${title} comic book`} />
                    <title>{title}</title>
                </Helmet>
            </HelmetProvider>
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">
                Back to all
            </Link>
        </div>
    );
}; // Получает в себя объект comic и возвращает верстку основываясь на нем

export default SingleComic;
