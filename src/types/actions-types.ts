// CARDS ACTIONS

import { CardsState } from "../redux/reducers/cards-reducer"
import { CardItemResponse, ColumnNumber } from "./api-types"

export type CardsActions = FetchCardsAction
                         | SetCardsAction
                         | OpenNewCardMenuAction
                         | CloseNewCardMenuAction
                         | EditNewCardTextAction
                         | AddNewCardAction
                         | DeleteCardAction
                         | MoveCardAction
                         | UpdateColumnLocally
                         | LogOutAction

export type FetchCardsAction = {
  type: 'FETCH_CARDS'
  payload: string
}

export type SetCardsAction = {
  type: 'SET_CARDS'
  payload: CardItemResponse[]
}

export type OpenNewCardMenuAction = {
  type: 'OPEN_NEW_CARD_MENU'
  payload: ColumnNumber
}

export type CloseNewCardMenuAction = {
  type: 'CLOSE_NEW_CARD_MENU'
  payload: ColumnNumber
}

export type EditNewCardTextAction = {
  type: 'EDIT_NEW_CARD_TEXT'
  payload: {
    column: ColumnNumber
    text: string
  }
}

export type AddNewCardAction = {
  type: 'ADD_NEW_CARD'
  payload: {
    column: ColumnNumber
    text: string
    token: string
  }
}

export type DeleteCardAction = {
  type: 'DELETE_CARD'
  payload: {
    cardId: number,
    token: string
  }
}

export type MoveCardAction = {
  type: 'MOVE_CARD'
  payload: { 
    cardId: number
    source: CardPlace
    destination: CardPlace
    currentCards: CardsState
    token: string
  }
}

export type CardPlace = {
  column: ColumnNumber
  index: number
}

export type UpdateColumnLocally = {
  type: 'UPDATE_COLUMN_LOCALLY'
  payload: {
    column: ColumnNumber,
    cards: CardItemResponse[]
  }
}

// AUTH ACTIONS

export type AuthActions = LogInAction
                        | LogOutAction
                        | RegisterUserAction
                        | SetLogInDataAction
                        | SetAuthError
                        | SetRegError

export type LogInAction = {
  type: 'LOG_IN'
  payload: {
    username: string
    password: string
  }
}

export type LogOutAction = {
  type: 'LOG_OUT'
}

export type RegisterUserAction = {
  type: 'REGISTER_USER'
  payload: {
    username: string
    email: string
    password: string
  }
}

export type SetLogInDataAction = {
  type: 'SET_LOGIN_DATA'
  payload: {
    username: string
    password: string
    token: string
  }
}

export type SetAuthError = {
  type: 'SET_AUTH_ERROR'
  payload: string | null
}

export type SetRegError = {
  type: 'SET_REG_ERROR'
  payload: string | null
}