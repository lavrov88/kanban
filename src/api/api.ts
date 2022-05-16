import { CardItemResponse, ColumnNumber, CreateUserObj } from './../types/api-types'
import axios, { AxiosError, AxiosResponse } from "axios"

const apiUrl = 'https://trello.backend.tests.nekidaem.ru/api/v1'
const getHeaders = (token: string) => ({
  headers: {
    Authorization: `JWT ${token}`
  }
})

export const cardsAPI = {
  async getCards(token: string): Promise<AxiosResponse | AxiosError> {
    try {
      return await axios.get(`${apiUrl}/cards/`, getHeaders(token))
    } catch (e) {
      return e as AxiosError
    }
  },

  async createCard(token: string, 
                   row: ColumnNumber, 
                   text: string): Promise<CardItemResponse[] | AxiosError> {
    try {
      const response = await axios.post(`${apiUrl}/cards/`, { row, text }, getHeaders(token))
      return response.data
    } catch (e) {
      return e as AxiosError
    }
  },

  async updateCard(
    token: string, id: number, row: ColumnNumber, seq_num: number, text: string
  ): Promise<AxiosResponse | AxiosError> {
    try {
      return await axios.patch(`${apiUrl}/cards/${id}/`,
                               { row, seq_num, text },
                               getHeaders(token))
    } catch (e) {
      return e as AxiosError
    }
  },

  async deleteCard(token: string, cardId: number): Promise<AxiosResponse | AxiosError> {
    try {
      return await axios.delete(`${apiUrl}/cards/${cardId}/`, getHeaders(token))
    } catch (e) {
      return e as AxiosError
    }
  }
}

export const usersAPI = {
  async createUser(username: string, 
                   email: string, 
                   password: string): Promise<AxiosResponse | AxiosError> {
    const dataObj: CreateUserObj = { username, password }
    if (email) {
      dataObj.email = email
    }

    try {
      return await axios.post(`${apiUrl}/users/create/`, dataObj)
    } catch (e) {
      return e as AxiosError
    }
  },

  async login(username: string, password: string): Promise<AxiosResponse | AxiosError> {
    try {
      const response = await axios.post(`${apiUrl}/users/login/`, {
        username, password
      })
      return response
    } catch (e) {
      console.log(e)
      return e as AxiosError
    }
  }
}