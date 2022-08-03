import { ITodo } from '../redux/todoSlice';
import { addTodo } from '../redux/todoSlice';
import { takeEvery, put, call, all } from 'redux-saga/effects';
import { toDoServerPost } from '../api';


export function* workerSaga(action: any): Generator {

  try {
    console.log(action)
    const data = yield call(toDoServerPost, action.payload)
    yield put(addTodo(data as ITodo))
  }
  catch (error) {
    throw new Error('Error !!!')
  }
}

export function* watchSagaPost(): Generator {
  yield takeEvery('todos/postRequest', workerSaga)
}