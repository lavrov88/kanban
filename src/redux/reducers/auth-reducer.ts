import { AuthActions } from "../../types/actions-types"

const initialState = {
  isLogged: false,
  loggingInProgress: false,
  authError: null as null | string,
  regError: null as null | string,
  currentUsername: null as null | string,
  token: null as null | string
}
export type AuthState = typeof initialState

export const authReducer = (state: AuthState = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case 'SET_LOGIN_DATA':
      return {
        ...state,
        isLogged: true,
        currentUsername: action.payload.username,
        token: action.payload.token
      }

    case 'LOG_OUT': 
      return {
        ...initialState,
        currentUsername: state.currentUsername
      }

    case 'SET_AUTH_ERROR': 
      return {
        ...state,
        authError: action.payload
      }
  
    case 'SET_REG_ERROR': 
      return {
        ...state,
        regError: action.payload
      }

    default:
      return state
  }
}