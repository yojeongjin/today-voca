import 'redux';
import { Task } from 'redux-saga';
import { Persistor } from 'redux-persist';

declare module 'redux' {
  export interface Store {
    sagaTask?: Task;
    __persistor?: Persistor | undefined;
  }
}
