import { useSelector } from "react-redux";
import { RootState } from "../redux/reducer";
import TodoItem from './TodoItem';
import s from './home.module.css';
import React from 'react';

const TodoList = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const error: any = useSelector((state: RootState) => state.todos.error);

  return (
    <div>
      {error ? <div>Server error 500</div> :
      <div className={s.listWrapper}>
        {todos.length > 0 ?
          <ul>
            {
              todos.map((todo: any) => (
                <TodoItem
                  key={todo._id}
                  {...todo} />
              )
              )}
          </ul> :
          <div>Such todo not found</div>}
      </div>}
    </div>
  )
}

export default TodoList;