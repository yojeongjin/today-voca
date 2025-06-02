import { AnyAction } from 'redux';
import { createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
// persist
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// etc
import axios from 'axios';
// type
import { AuthReqType, UserInfoType } from '@/type/user';
import { handleApiError } from '@/utils/handleApiError';

export interface AuthState {
  user: UserInfoType | null;
  loading: boolean;
  error: Error | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const prefix = 'voca/auth';

export const { pending, success, fail } = createActions('PENDING', 'SUCCESS', 'FAIL', { prefix });

const reducer = handleActions<AuthState, any>(
  {
    PENDING: state => ({
      ...state,
      loading: true,
      error: null,
    }),
    SUCCESS: (state, action) => ({
      ...state,
      user: action.payload,
      loading: false,
      error: null,
    }),
    FAIL: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  { prefix },
);

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user'],
};

export default persistReducer(persistConfig, reducer);

// saga
export const { signin } = createActions('SIGNIN', {
  prefix,
});

export function* authSaga() {
  yield takeEvery(`${prefix}/SIGNIN`, signinSaga);
}

interface SigninSagaAction extends AnyAction {
  payload: AuthReqType;
}

function* signinSaga(action: SigninSagaAction): Generator<any, void, any> {
  try {
    yield put(pending());

    // 로그인 요청
    yield call(
      axios.post,
      `${process.env.NEXT_PUBLIC_APP_API_KEY}/v1/auth/signin`,
      action.payload,
      {
        withCredentials: true,
      },
    );
    // 로그인 성공하면 사용자 정보 가져오기
    const res: any = yield call(axios.get, `${process.env.NEXT_PUBLIC_APP_API_KEY}/v1/auth/user`, {
      withCredentials: true,
    });

    const user: UserInfoType = res.data.data;
    yield put(success(user));
    yield call(() => window.location.replace('/'));
    // 정보 저장
    yield put(success(user));
  } catch (error: any) {
    yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')));
    handleApiError(error);
  }
}
