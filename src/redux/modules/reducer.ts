import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import auth from './auth';
import common from './common';
import day from './day';

const rootReducer = (state: any, action: any) => {
  switch (action.type) {
    // ssr을 위함
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };
    default: {
      const combinedReducer = combineReducers({
        day,
        common,
        auth,
      });
      return combinedReducer(state, action);
    }
  }
};

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
