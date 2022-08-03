import React from 'react'
import axios, { AxiosResponse } from "axios";
import { ITodo } from './redux/todoSlice';

const baseURL = `http://localhost:5000/api/toDo/`

const params = {
  withCredentials: true,
  limit: 10
}

export const toDoServerGetAll = (payload: any): Promise<ITodo[]> => {
  const { page, filterValue } = payload

  return axios.get(
    baseURL, { params: { ...params, offset: params.limit * (page - 1), query: filterValue } }
  )
    .then((response: AxiosResponse) => {
      return response.data
    })
    .catch((error: Error | null) => {
      console.log(error);
      return error
    })
}

export const toDoServerPost = (toDoItem: ITodo): Promise<ITodo> => {

  return axios.post(
    baseURL, { toDoItem, params }
  )
    .then((response: AxiosResponse) => {
      return response.data
    })
    .catch((error: Error | null) => {
      console.log(error);
    })
}

export const toDoServerEdit = ({ _id, toDo }: ITodo | any): Promise<ITodo> => {

  return axios.patch(
    `${baseURL}${_id}`, { toDo, params }
  ).then((response: AxiosResponse) => {
    return response.data
  })
    .catch((error: Error | null) => {
      console.log(error);
    })
}

export const toDoServerToggle = ({ _id, completed }: ITodo | any): Promise<ITodo> => {

  return axios.patch(
    `${baseURL}${_id}`, { completed, params }
  ).then((response: AxiosResponse) => {
    return response.data
  })
    .catch((error: Error | null) => {
      console.log(error);
    })
}

export const toDoServerDelete = (_id: ITodo): Promise<ITodo> => {

  return axios.delete(
    `${baseURL}${_id}`, { params }
  ).then((response: AxiosResponse) => {
    return response.data
  })
    .catch((error: Error | null) => {
      console.log(error);
    })
}



