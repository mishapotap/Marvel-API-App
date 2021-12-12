// Get requests
class MarvelService {
    _apiBase = "https://gateway.marvel.com:443/v1/public/"; // _ means "DONT touch this" for others
    _apiKey = "apikey=42666d0364f9ef05a9229fe8de769fa3";

    getData = async (url) => {
        let result = await fetch(url); // Waiting for fetch to finish response

        if (!result.ok) {
            throw new Error(`Couldn't fetch ${url}, status: ${result.status}`);
        }
        return await result.json(); // Transform result to .json
    };
    getAllCharacters = () => {
        return this.getData(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
    };
    getCharacter = (id) => {
        return this.getData(`${this._apiBase}characters/${id}?${this._apiKey}`);
    };
}

export default MarvelService;
