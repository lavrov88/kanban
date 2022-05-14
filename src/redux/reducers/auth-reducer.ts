import { AuthActions } from "../../types/actions-types"

const initialState = {
  isLogged: false,
  loggingInProgress: false,
  currentUsername: null as null | string,
  currentPassword: null as null | string,
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
        currentPassword: action.payload.password,
        token: action.payload.token
      }
  
    default:
      return state
  }
}