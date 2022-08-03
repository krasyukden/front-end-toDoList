import { configureStore } from "@reduxjs/toolkit";
import { rootSaga } from '../saga/rootSaga';
import todoReducer from './todoSlice';
import createSagaMiddleware from 'redux-saga';

export const sagaMiddleware: any = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    todos: todoReducer
  },
  middleware: [sagaMiddleware]
})

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
