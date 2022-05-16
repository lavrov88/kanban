import { LogInAction, LogOutAction, RegisterUserAction, SetAuthError, SetLogInDataAction, SetRegError } from "../../types/actions-types";

export const logIn = (username: string, password: string): LogInAction => ({
  type: 'LOG_IN',
  payload: { username, password }
})

export const logOut = (): LogOutAction => ({
  type: 'LOG_OUT'
})

export const registerUser = (username: string, 
                             email: string, 
                             password: string): RegisterUserAction => ({
  type: 'REGISTER_USER',
  payload: { username, email, password }
})

export const setLogInData = (username: string, 
                             password: string, 
                             token: string): SetLogInDataAction => ({
  type: 'SET_LOGIN_DATA',
  payload: { username, password, token }
})

export const setAuthError = (error: string | null): SetAuthError => ({
  type: 'SET_AUTH_ERROR',
  payload: error
})

export const setRegError = (error: string | null): SetRegError => ({
  type: 'SET_REG_ERROR',
  payload: error
})