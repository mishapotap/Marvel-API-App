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

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }; // Возвращает одного персонажа

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
            comics: char.comics.items.slice(0, 10), // massive
        };
    }; // Трансформирует персоанажа в нужный нам формат

    return { loading, error, getAllCharacters, getCharacter };
};

export default useMarvelService;
