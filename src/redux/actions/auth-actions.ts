import { LogInAction, SetLogInDataAction } from "../../types/actions-types";

export const logIn = (username: string, password: string): LogInAction => ({
  type: 'LOG_IN',
  payload: { username, password }
})

export const setLogInData = (username: string, password: string, token: string): SetLogInDataAction => ({
  type: 'SET_LOGIN_DATA',
  payload: { username, password, token }
})