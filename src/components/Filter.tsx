import { Button, Stack, TextField, Box } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/redux-hook';
import { getAllRequest } from '../redux/todoSlice';
import s from './home.module.css';

export const Filter = () => {

  const [filterValue, setFilterValue] = useState('');
  const dispatch: any = useAppDispatch();
  const navigate = useNavigate();

  const handleKeyDown = (event: any) => {

    if (event.key === 'Enter') {
      submitFilter()
    }
  }

  const submitFilter = () => {

    if (filterValue) {
      navigate(`?query=${filterValue}`)
      dispatch(getAllRequest({ page: 1, filterValue }))
    }
    else {
      navigate(`/`)
      dispatch(getAllRequest({ page: 1 }))
    }
    setFilterValue('')
  }

  return (
    <div>
      <div className={s.filter}>
        <TextField
          sx={{
            '& > :not(style)': { m: 3, width: '618.59px' },
          }}
          id="outlined-required"
          value={filterValue} onChange={(e: any) => {
            let filterValue = e.target.value;
            setFilterValue(filterValue)
          }}
          onKeyDown={handleKeyDown}
          placeholder={'Search'} />
        <Stack className={s.button} spacing={2} direction="row">
          <Button sx={{ margin: '0 auto', width: '95.75px' }} type="submit"
            onClick={submitFilter} variant="contained"
          >FILTER</Button>
        </Stack>
      </div>
    </div>
  )
}
export default Filter;
