import { ITodo } from '../redux/todoSlice';
import { addTodo, deleteRequest, removeTodo } from '../redux/todoSlice';
import { takeEvery, put, call, all } from 'redux-saga/effects';
import { toDoServerDelete } from '../api';


export function* workerSaga(action: any): Generator {

  try {
    console.log(action)
    const data = yield call(toDoServerDelete, action.payload._id)
    yield put(removeTodo(data as ITodo))
  }
  catch (error) {
    throw new Error('Error !!!')
  }
}

export function* watchSagaDelete(): Generator {
  yield takeEvery('todos/deleteRequest', workerSaga)
}