import { useHttp } from "../hooks/http.hook";

// Get requests
const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp();

    const _apiBase = "https://gateway.marvel.com:443/v1/public/"; // _ означает не трогать данные переменные для других разработчиков
    const _apiKey = "apikey=42666d0364f9ef05a9229fe8de769fa3";
    const _baseOffset = 210; //140 210

    const getAllCharacters = async (offset = _baseOffset) => {
        // Добавляем offset в аргументы для гибкости
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter); // Возвращает массив персонажей
    };

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }; // Возвращает одного персонажа по имени

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }; // Возвращает одного персонажа по id

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }; // Вовзращает массив комиксов

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }; // Вовзращает один комикс по id

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description
                ? `${char.description.slice(0, 210)}...`
                : "Unfortunately this character has no description",
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items.slice(0, 10), // Массив
        };
    }; // Трансформирует персоанажа в нужный нам формат

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || "Unfortunately this comics has no description",
            pageCount: comics.pageCount
                ? `${comics.pageCount} pages`
                : "No information about the number of pages",
            thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
            language: comics.textObjects.language || "en-us",
            price: comics.prices[0].price === 0 ? "Price not found" : `${comics.prices[0].price}$`,
        };
    }; // Трансформирует комиксы в нужный нам формат

    return {
        loading,
        error,
        getAllCharacters,
        getCharacter,
        clearError,
        getAllComics,
        getComic,
        getCharacterByName,
    };
};

export default useMarvelService;
