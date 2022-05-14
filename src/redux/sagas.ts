import { setLogInData } from './actions/auth-actions';
import { call, put, takeEvery } from 'redux-saga/effects'
import { cardsAPI, usersAPI } from '../api/api'
import { AddNewCardAction, DeleteCardAction, LogInAction } from '../types/actions-types'
import { AxiosErrorObject, CardItemResponse, DeleteCardResponse, LoginResponse } from '../types/api-types'
import { closeNewCardMenu, editNewCardText, setCards } from './actions/cards-actions';

function* logIn(action: LogInAction) {
  const data: Promise<LoginResponse | AxiosErrorObject> = yield call(
    usersAPI.login,
    action.payload.username,
    action.payload.password
  )
  const token = (data as unknown as LoginResponse).token

  yield put(setLogInData(
    action.payload.username, 
    action.payload.password, 
    token
  ))

  yield call(getCards, token)
}

function* getCards(token: string) {
  const cards: Promise<CardItemResponse[] | AxiosErrorObject> = yield call(
    cardsAPI.getCards,
    token
  )
  yield put(setCards(cards as unknown as CardItemResponse[]))
}

function* addNewCard(action: AddNewCardAction) {
  const { token, column, text } = action.payload
  const data: CardItemResponse[] | AxiosErrorObject = yield call(cardsAPI.createCard, token, column, text)
  yield call(console.log, data)
  yield call(getCards, token)
  yield put(editNewCardText(column, ''))
  yield put(closeNewCardMenu(column))
}

function* deleteCard(action: DeleteCardAction) {
  const { token, cardId } = action.payload
  yield call(console.log, action.payload.cardId)
  const data: DeleteCardResponse | AxiosErrorObject = yield call(cardsAPI.deleteCard, token, cardId)
  if ((data as DeleteCardResponse).status === 204) {
    yield call(getCards, token)
  }
}

function* mySaga() {
  yield takeEvery('LOG_IN', logIn)
  yield takeEvery('ADD_NEW_CARD', addNewCard)
  yield takeEvery('DELETE_CARD', deleteCard)
}

export default mySaga