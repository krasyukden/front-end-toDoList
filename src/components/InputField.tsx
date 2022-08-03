import { FC } from 'react';
import React from 'react'
import { Button, Stack, TextField, Box } from '@mui/material';
import s from '../components/home.module.css';

interface InputProps {
  text: string,
  handleInput: (inputValue: string) => void;
  handleSubmit: () => void;
}

const InputField: FC<InputProps> = ({ text, handleInput, handleSubmit }) => {

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className={s.inputForm}>
      <TextField
        sx={{
          '& > :not(style)': { m: 3, width: '500px' },
        }}
        id="outlined-basic" variant="outlined"
        type='text' name='inputValue' value={text} onChange={(e: any) => {
          let inputValue = e.target.value;
          handleInput(inputValue)
        }}
        onKeyDown={handleKeyDown}
        placeholder={'Your text here'} />
      <Stack className={s.button} spacing={2} direction="row">
        <Button sx={{ margin: '0 auto' }} type="submit"
          onClick={handleSubmit} variant="contained">ADD TODO</Button>
      </Stack>
    </div>
  )
}

export default InputField;