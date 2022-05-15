import { setLogInData } from './actions/auth-actions';
import { all, call, put, takeEvery } from 'redux-saga/effects'
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
  const { cardId, source, destination, currentCards, token } = action.payload
  
  if (destination.column === source.column) {
    const columnItems = currentCards[source.column].cards
    const [ movedCard ] = columnItems.filter(c => c.id === cardId)

    let newColumnItems = [...columnItems]
    newColumnItems.splice(source.index, 1)
    newColumnItems.splice(destination.index, 0, movedCard)
    newColumnItems = [...newColumnItems.map((c, i) => ({ ...c, seq_num: i }))]

    yield put(updateColumnLocally(source.column, newColumnItems))

    yield all(newColumnItems.map(c => {
      return (
        call(cardsAPI.updateCard, token, c.id, c.row, c.seq_num, c.text)
      )
    }))

  } else {

    const sourceColumnItems = currentCards[source.column].cards
    const destinationColumnItems = currentCards[destination.column].cards
    const [ movedCard ] = sourceColumnItems.filter(c => c.id === cardId)

    const newSourceColumnItems = sourceColumnItems.filter(c => c.id !== cardId)

    let newDestinationColumnItems = [...destinationColumnItems]
    newDestinationColumnItems.splice(destination.index, 0, movedCard)
    newDestinationColumnItems = newDestinationColumnItems.map((c, i) => ({ ...c, seq_num: i }))

    yield put(updateColumnLocally(source.column, newSourceColumnItems))
    yield put(updateColumnLocally(destination.column, newDestinationColumnItems))

    yield all(newDestinationColumnItems.map(c => {
      return (
        call(cardsAPI.updateCard, token, c.id, destination.column, c.seq_num, c.text)
      )
    }))
  }
}

function* mySaga() {
  yield takeEvery('LOG_IN', logIn)
  yield takeEvery('ADD_NEW_CARD', addNewCard)
  yield takeEvery('DELETE_CARD', deleteCard)
  yield takeEvery('MOVE_CARD', moveCard)

}

export default mySaga