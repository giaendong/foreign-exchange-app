import { take, fork, call, put } from 'redux-saga/effects';
import exchange from 'api';
import {
  GET_LATEST_EXCHANGE_START,
  GET_LATEST_EXCHANGE_ERROR,
  GET_LATEST_EXCHANGE_SUCCESS,
} from './actions';

function* getLatestExchange(base) {
  try {
    const response = yield call(exchange.getLatestExchange, base);
    if (response) {
      yield put({ type: GET_LATEST_EXCHANGE_SUCCESS, response });
    } else {
      throw response; // throw the err response
    }
  } catch (e) {
    yield put({ type: GET_LATEST_EXCHANGE_ERROR, e });
  }
}

function* watchGetLatestExchange() {
  while (true) {
    const { base } = yield take(GET_LATEST_EXCHANGE_START);
    yield fork(getLatestExchange, base);
  }
}

export default function* exchangeSagas() {
  yield fork(watchGetLatestExchange);
}
