import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

import "./charInfo.scss";
// Отписываться от таймаутов
// Ставить зависимости в useEffect чтобы не попасть в бесконечный цикл
const CharInfo = (props) => {
    // props: charId={selectedChar} - id выбранного персонажа

    const [char, setChar] = useState(null);

    const { loading, error, getCharacter, clearError } = useMarvelService(); // Из хука вытащил нужные

    useEffect(() => {
        updateChar();
    }, [props.charId]); // Сработает и при mount и при обновлении персонажа

    const updateChar = () => {
        const { charId } = props;
        if (!charId) {
            return;
        }
        clearError();
        getCharacter(charId).then(onCharLoaded);
    }; // Главный метод (нет спиннера и catch потому что они внутри хука useMarvelService)

    const onCharLoaded = (char) => {
        setChar(char);
    }; // Устанавливает персонажа в state (помощь)

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
