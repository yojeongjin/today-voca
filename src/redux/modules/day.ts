import { AnyAction } from 'redux';

// 액션 타입
const SET_DAILY_ID = 'day/SET_DAILY_ID';

// 액션 생성 함수
export const setDailyId = (id: number) => ({ type: SET_DAILY_ID, setDailyId: id });

// Day type 지정
export interface DayState {
  setDailyId: number;
}

const initialState = {
  setDailyId: 0,
};

export default function day(state = initialState, action: AnyAction) {
  switch (action.type) {
    case SET_DAILY_ID:
      return { ...state, setDailyId: action.setDailyId };
    default:
      return state;
  }
}
