import promisePolyfill from 'es6-promise';
import 'isomorphic-fetch';

const API_ROOT = 'https://api.exchangeratesapi.io';

promisePolyfill.polyfill();

function getLatestExchange(base) {
  return fetch(`${ API_ROOT }/latest?base=${ base }`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return false;
    });
}

export default {
  getLatestExchange,
};
