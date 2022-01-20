import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

import "./charInfo.scss";
// Отписываться от таймаутов
// Ставить зависимости в useEffect чтобы не попасть в бесконечный цикл
const CharInfo = (props) => {
    // props: charId={selectedChar} - id выбранного персонажа

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService(); // Получили новый экземпляр объекта который конструируется при помощи класса MarvelService

    useEffect(() => {
        updateChar();
    }, [props.charId]); // Объединил в два

    const updateChar = () => {
        //TODO
        if (!props.charId) {
            return;
        }
        onCharLoading(); // Спиннер пока грузится персонаж
        marvelService.getCharacter(props.charId).then(onCharLoaded).catch(onError);
    }; // Главный метод

    const onCharLoading = () => {
        setLoading(true);
    }; // Устанавливает спиннер пока персонаж прогружается (помощь)

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }; // Устанавливает персонажа в state и убирает спиннер (помощь)

    const onError = () => {
        setLoading(false);
        setError(true);
    }; // Устанавливает ошибку в state (помощь)

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;
    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
};
// TODO начало View
const View = ({ char }) => {
    const { name, thumbnail, homepage, wiki, description, comics } = char;

    let imgStyle = { objectFit: "cover" };
    if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        imgStyle = { objectFit: "contain" };
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length === 0
                    ? "Unfortunately, there is no comics with this character"
                    : null}
                {comics.map((item, i) => {
                    return (
                        <li key={i} className="char__comics-item">
                            {item.name}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};
CharInfo.propTypes = {
    charId: PropTypes.number,
};

export default CharInfo;
