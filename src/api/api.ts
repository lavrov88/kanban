import { AxiosErrorObject, CardItemResponse, ColumnNumber, CreateUserResponse, LoginResponse } from './../types/api-types'
import axios, { AxiosError } from "axios"

const apiUrl = 'https://trello.backend.tests.nekidaem.ru/api/v1'
const apiError = (e: AxiosError): AxiosErrorObject => ({
  errorName: e.name,
  errorMessage: e.message
})
const getHeaders = (token: string) => ({
  headers: {
    Authorization: `JWT ${token}`
  }
})

export const cardsAPI = {
  async getCards(token: string): Promise<CardItemResponse[] | AxiosErrorObject> {
    try {
      const response = await axios.get(`${apiUrl}/cards/`, getHeaders(token))
      return response.data
    } catch (e) {
      return apiError(e as AxiosError)
    }
  },

  async createCard(token: string, row: ColumnNumber, text: string): Promise<CardItemResponse[] | AxiosErrorObject> {
    try {
      const response = await axios.post(`${apiUrl}/cards/`, { row, text }, getHeaders(token))
      return response.data
    } catch (e) {
      return apiError(e as AxiosError)
    }
  },

  async deleteCard(token: string, cardId: number) {
    try {
      const response = await axios.delete(`${apiUrl}/cards/${cardId}/`, getHeaders(token))
      return response
    } catch (e) {
      return apiError(e as AxiosError)
    }
  }
}

export const usersAPI = {
  async createUser(username: string, email: string, password: string): Promise<CreateUserResponse | AxiosErrorObject> {
    try {
      const response = await axios.post(`${apiUrl}/users/create/`, {
        username, email, password
      })
      return response.data
    } catch (e) {
      return apiError(e as AxiosError)
    }
  },

  async login(username: string, password: string): Promise<LoginResponse | AxiosErrorObject> {
    try {
      const response = await axios.post(`${apiUrl}/users/login/`, {
        username, password
      })
      return response.data
    } catch (e) {
      return apiError(e as AxiosError)
    }
  }
}