import { createSlice } from "@reduxjs/toolkit";


export interface IState {
  todos: Array<ITodo>,
  loading: boolean,
  error: Error | null | boolean,
  totalCount: number
}

export interface ITodo {
  toDoItem: {
    toDo: string,
    completed: boolean
  },
  _id: string
}

const initialState: IState = {
  todos: [],
  loading: false,
  error: null,
  totalCount: 0
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {

    getAllRequest(state: IState, action: any) {
      state.loading = true
      state.error = false
    },
    postRequest(state: IState, action: any) {
      state.loading = true
      state.error = false
    },
    toggleRequest(state: IState, action: any) {
      state.loading = true
      state.error = false
    },
    editRequest(state: IState, action: any) {
      state.loading = true
      state.error = false
    },
    deleteRequest(state: IState, action: any) {
      state.loading = true
      state.error = false
    },
    getAllTodos(state: IState, action: any) {
      state.todos = action.payload
      state.loading = false
      state.error = false
    },
    addTodo(state: IState, action: any) {

      state.todos.push(
        {
          toDoItem: {
            toDo: action.payload.toDoItem.toDo,
            completed: action.payload.toDoItem.completed
          },
          _id: action.payload._id
        }
      )
      state.loading = false
      state.error = false
    },
    editToDo(state: IState, action: any) {
      const editTodo = state.todos.find(todo => todo._id === action.payload._id);
      if (editTodo) editTodo.toDoItem.toDo = action.payload.toDoItem.toDo;
      state.loading = false
      state.error = false
    },
    toggleTodoComplete(state: IState, action: any) {
      const toggledTodo = state.todos.find(todo => todo._id === action.payload._id);
      if (toggledTodo) toggledTodo.toDoItem.completed = action.payload.toDoItem.completed;
      state.loading = false
      state.error = false
    },
    removeTodo(state: IState, action: any) {
      state.todos = state.todos.filter(todo => todo._id !== action.payload._id)
      state.loading = false
      state.error = false
    },
    sortByAsc(state: IState) {
      state.todos = state.todos.sort((a, b) => a.toDoItem.toDo > b.toDoItem.toDo ? 1 : -1)
    },
    sortByDis(state: IState) {
      state.todos = state.todos.sort((a, b) => a.toDoItem.toDo < b.toDoItem.toDo ? 1 : -1)
    },
    setTotalCount(state: IState, action: any) {
      state.totalCount = action.payload
      state.error = false
    },
    errorGetTodos(state: IState, action: any) {
      state.loading = false
      state.error = true
    }
  }
})

export const { postRequest, deleteRequest, toggleRequest, editRequest, getAllRequest, getAllTodos, addTodo,
  editToDo, removeTodo, toggleTodoComplete, sortByAsc, sortByDis, setTotalCount,
  errorGetTodos } = todoSlice.actions;

export default todoSlice.reducer;