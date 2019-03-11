export const GET_LATEST_EXCHANGE_START = 'GET_LATEST_EXCHANGE_START';
export const GET_LATEST_EXCHANGE_ERROR = 'GET_LATEST_EXCHANGE_ERROR';
export const GET_LATEST_EXCHANGE_SUCCESS = 'GET_LATEST_EXCHANGE_SUCCESS';

export function getLatestExchange(base) {
  return {
    type: GET_LATEST_EXCHANGE_START,
    base,
  };
}
