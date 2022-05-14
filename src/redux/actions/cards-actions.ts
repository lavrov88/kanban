import { AddNewCardAction, CloseNewCardMenuAction, DeleteCardAction, EditNewCardTextAction, OpenNewCardMenuAction } from './../../types/actions-types';
import { GetCardsAction, SetCardsAction } from "../../types/actions-types";
import { CardItemResponse, ColumnNumber } from "../../types/api-types";

export const getCards = (token: string): GetCardsAction => ({
  type: 'GET_CARDS',
  payload: token
})

export const setCards = (cards: CardItemResponse[]): SetCardsAction => ({
  type: 'SET_CARDS',
  payload: cards
})

export const openNewCardMenu = (column: ColumnNumber): OpenNewCardMenuAction => ({
  type: 'OPEN_NEW_CARD_MENU',
  payload: column
})

export const closeNewCardMenu = (column: ColumnNumber): CloseNewCardMenuAction => ({
  type: 'CLOSE_NEW_CARD_MENU',
  payload: column
})

export const editNewCardText = (column: ColumnNumber, text: string): EditNewCardTextAction => ({
  type: 'EDIT_NEW_CARD_TEXT',
  payload: { column, text }
})

export const addNewCard = (column: ColumnNumber, text: string, token: string): AddNewCardAction => ({
  type: 'ADD_NEW_CARD',
  payload: { column, text, token }
})

export const deleteCard = (cardId: number, token: string): DeleteCardAction => ({
  type: 'DELETE_CARD',
  payload: { cardId, token }
})