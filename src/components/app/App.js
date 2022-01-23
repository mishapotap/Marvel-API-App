import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from "../../resources/img/vision.png";
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import SingleComic from "../singleComic/SingleComic";

const App = () => {
    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id);
    }; // Установили id выбранного персонажа в state

    return (
        <div className="app">
            <AppHeader />
            <main>
                {/* <ErrorBoundary>
                    <RandomChar />
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar} />
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision" /> */}
                <AppBanner />
                <ComicsList />
                {/* <SingleComic /> */}
            </main>
        </div>
    );
};

export default App;
