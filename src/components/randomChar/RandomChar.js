import { useState, useEffect } from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";

const RandomChar = () => {
    const [char, setChar] = useState({});

    const { loading, error, getCharacter, clearError } = useMarvelService(); // Из хука вытащил нужные

    useEffect(() => {
        updateChar();
        // const timerId = setInterval(updateChar, 5000);
        // return () => {
        //     clearInterval(timerId);
        // };
    }, []);

    const onCharLoaded = (char) => {
        setChar(char);
    }; // Устанавливает персонажа в state (помощь)

    const updateChar = () => {
        clearError(); // Очистка ошибки перед каждым рандомом персонажа (иначе ее не скинуть если на нее наткнулись)
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); // Рандомит персонажа
        getCharacter(id).then(onCharLoaded);
    }; // Главный метод (нет catch потому что он внутри хука)

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!
                    <br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">Or choose another one</p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    );
};
const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;

    let imgStyle = { objectFit: "cover" };
    if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        imgStyle = { objectFit: "contain" };
    }

    return (
        <div className="randomchar__block">
            <img
                src={thumbnail}
                alt="Random character"
                className="randomchar__img"
                style={imgStyle}
            />
            <div className="randomchar__info">
                <p className="randomchar__name">
                    {name}
                    {/* TODO Вызелает ошибка (ругается на length). Из-за того что понлостью/ не переписаны компоненты на хуки*/}
                    {/* {name.length > 20 ? `${name.slice(0, 21)}...` : name} */}
                </p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">Homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RandomChar;
