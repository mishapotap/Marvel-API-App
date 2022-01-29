import useMarvelService from "../../services/MarvelService";
import "./charSearchForm.scss";
// Поисковая форма
const CharSearchForm = () => {
    return (
        <div className="char__search-form">
            <label className="char__search-label" htmlFor="charName">
                Find a character by name:
            </label>
            <div className="char__search-wrapper">
                <input id="charName" name="charName" type="text" placeholder="Enter name" />
                <button type="submit" className="button button__main">
                    <div className="inner">find</div>
                </button>
            </div>
            {/* база */}
            {/* если успех */}
            <div className="char__search-wrapper">
                <div className="char__search-success">There is! Visit charname page?</div>
                <button className="button button__secondary">
                    <div className="inner">To page</div>
                </button>
            </div>
            {/* если успех */}
            {/* если не найден */}
            <div className="char__search-error">
                The character was not found. Check the name and try again
            </div>
            {/* если не найден */}
            {/* под required */}
            <div className="char__search-critical-error"></div>
            {/* под required */}
        </div>
    );
};

export default CharSearchForm;
