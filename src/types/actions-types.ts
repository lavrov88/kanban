// CARDS ACTIONS

import { CardsState } from "../redux/reducers/cards-reducer"
import { CardItemResponse, ColumnNumber } from "./api-types"

export type CardsActions = GetCardsAction
                         | SetCardsAction
                         | OpenNewCardMenuAction
                         | CloseNewCardMenuAction
                         | EditNewCardTextAction
                         | AddNewCardAction
                         | DeleteCardAction
                         | MoveCardAction
                         | UpdateColumnLocally

export type GetCardsAction = {
  type: 'GET_CARDS'
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
                        | SetLogInDataAction

export type LogInAction = {
  type: 'LOG_IN'
  payload: {
    username: string
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