import { AxiosErrorObject, CardItemResponse, CreateUserResponse, LoginResponse } from './../types/api-types'
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
  }
}

export const usersAPI = {
  async create(username: string, email: string, password: string): Promise<CreateUserResponse | AxiosErrorObject> {
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