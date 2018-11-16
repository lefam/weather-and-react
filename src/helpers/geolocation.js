export default class GeolocationService {

    /**
     * Determines if geolocation service is available
     * @returns {boolean}
     */
  static isAvailable() {
    return 'geolocation' in navigator;
  }

    /**
     * Returns a promise which resolves to the current user's location.
     * It may reject if the user rejects or another error occurs in the process.
     *
     * @returns {Promise<any>}
     */
  static getCurrentPosition() {
    return new Promise((resolve, reject) => {
      const successCB = (position) => resolve(position);
      const errorCB = () => reject('Failed to read current location');

      navigator.geolocation.getCurrentPosition(successCB, errorCB);
    });
  }
}
