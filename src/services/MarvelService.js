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
            `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
        );
        return res.data.results.map((item) => this._transformCharacter(item)); // Returns massive with all characters
    };

    getCharacter = async (id) => {
        const res = await this.getData(
            `${this._apiBase}characters/${id}?${this._apiKey}`
        );
        return this._transformCharacter(res.data.results[0]);
    };

    _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description
                ? `${char.description.slice(0, 210)}...`
                : "Unfortunately this character has no description",
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
        };
    };
}

export default MarvelService;
