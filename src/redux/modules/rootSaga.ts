import { all } from 'redux-saga/effects';
// saga
import { authSaga } from './auth';

export default function* rootSaga() {
  yield all([authSaga()]);
}
