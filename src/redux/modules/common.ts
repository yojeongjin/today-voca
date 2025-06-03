import { AnyAction } from 'redux';

// 액션 타입
const SET_LOADING = 'common/SET_LOADING';

// 액션 생성 함수
export const setLoading = (loading: boolean) => ({ type: SET_LOADING, setLoading: loading });

// Common type 지정
export interface CommonState {
  setLoading: boolean;
}

const initialState = {
  setLoading: false,
};

export default function common(state = initialState, action: AnyAction) {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, setLoading: action.setLoading };
    default:
      return state;
  }
}
