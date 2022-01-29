import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import AppBanner from "../appBanner/AppBanner";
import "./singleChar.scss";

const SingleChar = () => {
    const { charId } = useParams(); // Вытащил charId из параметров
    const [char, setChar] = useState(null);
    const { loading, error, getCharacter, clearError } = useMarvelService(); // Из хука вытащил нужные

    useEffect(() => {
        updateChar();
    }, [charId]);

    const updateChar = () => {
        if (!charId) {
            return;
        }
        clearError();
        getCharacter(charId).then(onCharLoaded);
    }; // Главный метод (нет спиннера и catch потому что они внутри хука useMarvelService)

    const onCharLoaded = (char) => {
        setChar(char);
    }; // Устанавливает персонажа в state (помощь)

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;
    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    );
};

const View = ({ char }) => {
    const { name, thumbnail, description } = char;
    return (
        <>
            <AppBanner />
            <div className="single-comic">
                <img src={thumbnail} alt={name} className="single-comic__char-img" />
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{description}</p>
                </div>
                <Link to="/characters" className="single-comic__back">
                    Back to all
                </Link>
            </div>
        </>
    );
};

export default SingleChar;
