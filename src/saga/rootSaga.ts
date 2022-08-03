import { watchSagaPost } from "./sagaPost";
import { all } from 'redux-saga/effects';
import { watchSagaDelete } from "./sagaDelete";
import { watchSagaToggle } from "./sagaToggle";
import { watchSagaGetAll } from "./sagaGetAll";
import { watchSagaEditToDo } from "./sagaEditToDo";


export function* rootSaga(): Generator {
  yield all([
    watchSagaGetAll(),
    watchSagaPost(),
    watchSagaDelete(),
    watchSagaToggle(),
    watchSagaEditToDo()
  ])
}