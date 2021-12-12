import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/App";
import MarvelService from "./services/MarvelService";
import "./style/style.scss";

const marvelService = new MarvelService(); // Created new class exemplar

marvelService
    .getAllCharacters()
    .then((res) => console.log(res.data.results.forEach((item) => console.log(item.name)))); // Test request

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
