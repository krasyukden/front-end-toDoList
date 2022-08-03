import { editToDo, ITodo } from '../redux/todoSlice';
import { takeEvery, put, call, all } from 'redux-saga/effects';
import { toDoServerEdit } from '../api';


export function* workerSaga(action: any): Generator {

  try {
    const data = yield call(toDoServerEdit, action.payload)
    
    yield put(editToDo(data as ITodo))
  }
  catch (error) {
    throw new Error('Error !!!')
  }
}
export function* watchSagaEditToDo(): Generator {
  yield takeEvery('todos/editRequest', workerSaga)
}