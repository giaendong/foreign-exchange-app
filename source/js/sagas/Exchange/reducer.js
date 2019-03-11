import { Map } from 'immutable';

import {
  GET_LATEST_EXCHANGE_START,
  GET_LATEST_EXCHANGE_ERROR,
  GET_LATEST_EXCHANGE_SUCCESS,
} from './actions';

const initialState = Map({
  latestExchangeLoad: false,
  latestExchangeData: {},
  latestExchangeError: false,
});

const actionsMap = {
  // Async action
  [GET_LATEST_EXCHANGE_START]: (state) => {
    return state.merge(Map({
      latestExchangeData: {},
      latestExchangeLoad: true,
      latestExchangeError: false,
    }));
  },
  [GET_LATEST_EXCHANGE_ERROR]: (state) => {
    return state.merge(Map({
      latestExchangeData: {},
      latestExchangeLoad: false,
      latestExchangeError: true,
    }));
  },
  [GET_LATEST_EXCHANGE_SUCCESS]: (state, action) => {
    return state.merge(Map({
      latestExchangeData: action.response,
      latestExchangeLoad: false,
      latestExchangeError: false,
    }));
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
