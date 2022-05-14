import { setLogInData } from './actions/auth-actions';
import { call, put, takeEvery } from 'redux-saga/effects'
import { cardsAPI, usersAPI } from '../api/api'
import { AddNewCardAction, DeleteCardAction, LogInAction, MoveCardAction } from '../types/actions-types'
import { AxiosErrorObject, CardItemResponse, DeleteCardResponse, LoginResponse } from '../types/api-types'
import { closeNewCardMenu, editNewCardText, setCards, updateColumnLocally } from './actions/cards-actions';

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

function* moveCard(action: MoveCardAction) {
  const { cardId, source, destination, currentCards } = action.payload
  
  if (destination.column === source.column) {
    const columnItems = currentCards[source.column].cards
    const [ movedCard ] = columnItems.filter(c => c.id === cardId)

    let newColumnItems = [...columnItems]
    newColumnItems.splice(source.index, 1)
    newColumnItems.splice(destination.index, 0, movedCard)
    newColumnItems = [...newColumnItems.map((card, index) => ({ ...card, seq_num: index }))]

    yield call(console.log, (columnItems))
    yield call(console.log, (movedCard))
    yield call(console.log, (newColumnItems))

    yield put(updateColumnLocally(source.column, newColumnItems))
  }
}

function* mySaga() {
  yield takeEvery('LOG_IN', logIn)
  yield takeEvery('ADD_NEW_CARD', addNewCard)
  yield takeEvery('DELETE_CARD', deleteCard)
  yield takeEvery('MOVE_CARD', moveCard)

}

export default mySaga