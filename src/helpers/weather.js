import Api from "./api";

export default class WeatherService {

    /**
     * Returns a promise which resolves to the current user's location.
     * It may reject if the user rejects or another error occurs in the process.
     *
     * @returns {Promise<any>}
     */
    static getLocationConditions(lat, lng) {
        const yql = `select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE text="(${lat}, ${lng})")`;
        const url = `/weather-api/v1/public/yql?q=${encodeURIComponent(yql)}`;

        return Api.get(url);
    }
}
