import { useDispatch } from "react-redux"
import { deleteRequest, editRequest, removeTodo, toggleRequest } from "../redux/todoSlice";
import React, { FC, SyntheticEvent, useState } from 'react';// FC -функцирн компонент !!
import { useAppDispatch } from "../redux/redux-hook";
import s from './home.module.css';
import { TextField, Box, TextFieldProps } from "@mui/material";


interface FocusEvent<T = Element> extends SyntheticEvent<T> {
  relatedTarget: EventTarget | null;
  target: EventTarget & T;
}

interface ItemProps {
  toDoItem: {
    toDo: string,
    completed: boolean
  },
  _id: string
}

const TodoItem: FC<ItemProps> = ({ _id, toDoItem }) => {

  const { toDo, completed } = toDoItem
  const dispatch = useAppDispatch();
  const [editToggle, setEditToggle] = useState(true)
  const [editValue, setEditValue] = useState(toDo)

  const edit = () => {
    setEditToggle(!editToggle)
  }

  const handleFocusEvent = (e: FocusEvent<HTMLInputElement>) => {
    if (e) {
      setEditToggle(true)
      const toDo = editValue;
      dispatch(editRequest({ _id, toDo }))
    }
  }
  return (
    <div className={s.list}>
      <li >
        <input
          type='checkbox'
          checked={completed}
          onChange={() => dispatch(toggleRequest({ _id, completed }))}
        />
        {editToggle ? <span className={s.text} onClick={edit}>{toDo}</span> :
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 3 },
            }}
            noValidate
            autoComplete="on"
          >
            <TextField id="outlined-basic" variant="outlined"
              type='text' name='inputValue' className={s.edit} value={editValue} onChange={(e: any) => {
                let editValue = e.target.value
                setEditValue(editValue)

              }}
              onBlur={(e: any) => handleFocusEvent(e)} />
          </Box>}
        <span className={s.delete} onClick={() => dispatch(deleteRequest({ _id }))}>
          &times;
        </span>
      </li >
    </div>
  )
}

export default TodoItem