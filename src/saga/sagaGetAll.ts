import { errorGetTodos, ITodo, setTotalCount } from '../redux/todoSlice';
import { getAllTodos } from '../redux/todoSlice';
import { takeEvery, put, call, all } from 'redux-saga/effects';
import { toDoServerGetAll, toDoServerPost } from '../api';


export function* workerSaga(action: any): Generator {

  try {
    const data = yield call(toDoServerGetAll, action.payload)
    const [result, totalCount]: any = data
    yield put(getAllTodos(result as ITodo))
    yield put(setTotalCount(totalCount))
  }
  catch (error) {
    yield put(errorGetTodos(error));
    throw new Error('Server Error 500 !!!')
  }
}

export function* watchSagaGetAll(): Generator {

  yield takeEvery('todos/getAllRequest', workerSaga)

}