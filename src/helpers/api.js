/**
 * Normalizes the responses from APIs so that the methods implemented here
 * can expect the same response format.
 *
 * @param response
 * @returns {Promise}
 */
function normalizeResponse(response) {
  if (response.status >= 400) {
    return Promise.reject(response);
  }
  return response.json();
}

/**
 * Implements utility methods that facilitate API calls.
 * Currently they are implemented as wrappers around the Fetch API. But the
 * clients are abstracted away from that.
 */
export default {
  /**
   * Makes an HTTP request using the given method and url. It accepts optional params and
   * authToken.
   * If present the authToken is sent in the Authorization header.
   *
   * @param {string} method The HTTP method to use (GET, POST, PUT, DELETE, etc)
   * @param {string} url The url
   * @param params Optional JSON object to be sent in the body
   * @param authToken Optional auth token to be sent in Authorization header.
   * @returns {Promise} Returns a promise that resolves to the response from the endpoint.
   */
  request(method, url, params, authToken) {
    const config = {
      method,
      headers: {
        'Accept': 'application/json'
      },
      credentials: 'include'
    };

    if (params) {
      config.body = JSON.stringify(params);
    }

    if (['POST', 'DELETE', 'PUT'].indexOf(method.toUpperCase()) !== -1) {
      config.headers['Content-Type'] = 'application/json;charset=utf-8';
    }

    if (authToken) {
      config.headers.Authorization = authToken;
    }
    return fetch(`${url}`, config)
      .then(normalizeResponse)
      .catch((response) => {
        const { headers } = response;

        if (headers && headers.get('Content-Type').indexOf('application/json') === 0) {
          return response.json().then(r => Promise.reject(r));
        }

        return Promise.reject(response);
      });
  },

  /**
   * Shortcut method to perform GET request. See request()
   *
   * @param {string} url The url
   * @param params Optional JSON object to be sent in the body
   * @param authToken Optional auth token to be sent in Authorization header.
   * @returns {Promise} Returns a promise that resolves to the response from the endpoint.
   */
  get(url, authToken) {
    return this.request('GET', url, null, authToken);
  },

  /**
   * Shortcut method to perform DELETE request. See request()
   *
   * @param {string} url The url
   * @param params Optional JSON object to be sent in the body
   * @param authToken Optional auth token to be sent in Authorization header.
   * @returns {Promise} Returns a promise that resolves to the response from the endpoint.
   */
  del(url, params, authToken) {
    return this.request('DELETE', url, params, authToken);
  },

  /**
   * Shortcut method to perform POST request. See request()
   *
   * @param {string} url The url
   * @param params Optional JSON object to be sent in the body
   * @param authToken Optional auth token to be sent in Authorization header.
   * @returns {Promise} Returns a promise that resolves to the response from the endpoint.
   */
  post(url, params, authToken) {
    return this.request('POST', url, params, authToken);
  },

  /**
   * Shortcut method to perform PUT request. See request()
   *
   * @param {string} url The url
   * @param params Optional JSON object to be sent in the body
   * @param authToken Optional auth token to be sent in Authorization header.
   * @returns {Promise} Returns a promise that resolves to the response from the endpoint.
   */
  put(url, params, authToken) {
    return this.request('PUT', url, params, authToken);
  }
};
