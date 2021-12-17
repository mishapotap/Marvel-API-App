// Get requests
class MarvelService {
    _apiBase = "https://gateway.marvel.com:443/v1/public/"; // _ means "DONT touch this" for others
    _apiKey = "apikey=42666d0364f9ef05a9229fe8de769fa3";

    getData = async (url) => {
        let result = await fetch(url); // Waiting for fetch to finish response

        if (!result.ok) {
            throw new Error(`Couldn't fetch ${url}, status: ${result.status}`);
        }
        return await result.json(); // Returns a Promise. Transform result from .json to JS
    };

    getAllCharacters = async () => {
        const res = await this.getData(
            `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}` // 140 210
        );
        return res.data.results.map(this._transformCharacter); // Return massive of characters
    };

    getCharacter = async (id) => {
        const res = await this.getData(
            `${this._apiBase}characters/${id}?${this._apiKey}`
        );
        return this._transformCharacter(res.data.results[0]);
    }; // Return one character

    _transformCharacter = (char) => {
        return {
            id: char.id,
            name:
                char.name.length > 20 ? `${char.name.slice(0, 21)}...` : char.name,
            description: char.description
                ? `${char.description.slice(0, 210)}...`
                : "Unfortunately this character has no description",
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items.slice(0, 10), // massive
        };
    }; // Transform character
}

export default MarvelService;
