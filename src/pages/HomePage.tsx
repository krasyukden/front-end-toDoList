import s from '../components/home.module.css';
import InputField from '../components/InputField';
import TodoList from '../components/TodoList';
import { useAppDispatch } from '../redux/redux-hook';
import React, { useEffect, useState } from 'react';
import { getAllRequest, postRequest, sortByDis, sortByAsc, IState } from '../redux/todoSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import Filter from '../components/Filter';
import { Button, Pagination, Stack } from '@mui/material';
import { RootState } from '../redux/reducer';
import { useSelector } from 'react-redux';
import Preloader from '../components/Preloader';



const HomePage = () => {

  const [page, setPage] = useState(1);
  const totalCount = useSelector((state: RootState) => state.todos.totalCount);
  const loading = useSelector((state: RootState) => state.todos.loading);
  const [text, setText] = useState('');
  const [isAsc, setIsAsc] = useState(true)
  const dispatch: any = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation()

  const search = location.search;
  const params = new URLSearchParams(search);
  const filterQuery: string | null = params.get('query');
  const sort: string | null = params.get('sort');

  const pagesCount: number = Math.ceil(totalCount / 10) 

  useEffect(() => {
    if (filterQuery) getAllTasks(1, filterQuery)
    else getAllTasks(1, '')
  }, [])

  const addTask = () => {
    if (text.trim().length) {
      dispatch(postRequest({
        "toDo": text,
        "completed": false
      }))
      setText('')
    }
  }

  const getAllTasks = (page: number, filterQuery?: string | null) => {
    setPage(page)
    if (filterQuery) {
      dispatch(getAllRequest({ page, filterValue: filterQuery }))
      
    } else dispatch(getAllRequest({ page }))
  }

  if (sort === 'asc') {
    dispatch(sortByAsc())
  }
  else if (sort === 'dis') {
    dispatch(sortByDis())
  }


  const sortByClick = () => {
    setIsAsc(!isAsc)

    if (isAsc) {
      dispatch(sortByAsc())

      if (filterQuery) { navigate(`?query=${filterQuery}&sort=asc`) }
      else { navigate(`?sort=asc`) }

    } else {
      dispatch(sortByDis())

      if (filterQuery) { navigate(`?query=${filterQuery}&sort=dis`) }
      else { navigate(`?sort=dis`) }
    }
  }

  return (
    <div>
      <div className={s.homeWrapper}>
        <div>
          <h1>TO DO LIST</h1>
          <Filter />
          <div className={s.inputForm}>
            <InputField text={text} handleInput={setText} handleSubmit={addTask} />
            <Stack className={s.button} spacing={2} direction="row">
              <Button sx={{ margin: '0 auto' }} type="submit"
                onClick={sortByClick} variant="contained">SORT BY</Button>
            </Stack>
          </div>
          {loading ? <Preloader /> :
            <div className={s.toDo}>
              <TodoList />
            </div>}
          <div className={s.page}>
            <Pagination count={pagesCount}
              onChange={(event: React.ChangeEvent<unknown>, page: number) => { getAllTasks(page, filterQuery) }} page={page} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage;