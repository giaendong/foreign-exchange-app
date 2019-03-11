import { all } from 'redux-saga/effects';

import exchange from 'sagas/Exchange/sagas';

export default function* rootSaga() {
  yield all([
    exchange(),
  ]);
}
