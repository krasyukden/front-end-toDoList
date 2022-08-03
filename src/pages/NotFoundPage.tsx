import React from 'react'
import { useLocation } from 'react-router-dom'
import s from '../components/home.module.css';

const NotFoundPage = () => {

  const location = useLocation()
  const error = location.pathname

  return (
    <div className={s.error}>
      <div>Error 404. Page `{error}` not found</div>
    </div>
  )
}

export default NotFoundPage