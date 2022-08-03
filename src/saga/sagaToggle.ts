import { ITodo } from '../redux/todoSlice';
import { toggleTodoComplete } from '../redux/todoSlice';
import { takeEvery, put, call, all } from 'redux-saga/effects';
import { toDoServerToggle } from '../api';


export function* workerSaga(action: any): Generator {

  try {

    const data = yield call(toDoServerToggle, action.payload)
    console.log(action.payload)
    yield put(toggleTodoComplete(data as ITodo))
  }
  catch (error) {
    throw new Error('Error !!!')
  }
}

export function* watchSagaToggle(): Generator {

  yield takeEvery('todos/toggleRequest', workerSaga)
}