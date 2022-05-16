import { AxiosError } from 'axios';
import { setLogInData, setAuthError, logOut, setRegError } from './actions/auth-actions';
import { all, call, put, takeEvery } from 'redux-saga/effects'
import { cardsAPI, usersAPI } from '../api/api'
import { AddNewCardAction, DeleteCardAction, FetchCardsAction, LogInAction, MoveCardAction, RegisterUserAction } from '../types/actions-types'
import { AxiosErrorObject, CardItemResponse, DeleteCardResponse, LoginResponse } from '../types/api-types'
import { closeNewCardMenu, editNewCardText, fetchCards, setCards, updateColumnLocally } from './actions/cards-actions';
import { AxiosResponse } from 'axios';

function* watcherSaga() {
  yield takeEvery('LOG_IN', logIn)
  yield takeEvery('ADD_NEW_CARD', addNewCard)
  yield takeEvery('DELETE_CARD', deleteCard)
  yield takeEvery('MOVE_CARD', moveCard)
  yield takeEvery('FETCH_CARDS', fetchCardsSaga)
  yield takeEvery('REGISTER_USER', registerUser)
}

// AUTH SAGAS

function* logIn(action: LogInAction) {
  const response: Promise<AxiosResponse | AxiosError> = yield call(
    usersAPI.login,
    action.payload.username,
    action.payload.password
  )

  if ((response as unknown as AxiosResponse).status === 200) {
    const token = (response as unknown as AxiosResponse).data.token
    yield put(setLogInData(
      action.payload.username,
      action.payload.password,
      token
    ))
    yield put(setAuthError(null))

  } else {
    if ((response as any).response?.data.non_field_errors) {
      yield put(setAuthError((response as any).response?.data.non_field_errors[0]))
    } else if ((response as any).response?.status >= 500) {
      yield put(setAuthError('Внутренняя ошибка сервера.'))
    } else {
      yield put(setAuthError('Некорректный ответ от сервера.'))
    }
  }
}

function* registerUser(action: RegisterUserAction) {
  const response: Promise<AxiosResponse | AxiosError> = yield call(
    usersAPI.createUser,
    action.payload.username,
    action.payload.email,
    action.payload.password
  )

  if ((response as unknown as AxiosResponse).status === 201) {
    const token = (response as unknown as AxiosResponse).data.token
    yield put(setLogInData(
      action.payload.username,
      action.payload.password,
      token
    ))
    yield put(setRegError(null))

  } else {
    console.log(response)
    if ((response as any).response?.data.non_field_errors) {
      yield put(setRegError((response as any).response?.data.non_field_errors[0]))
    } else if ((response as any).response?.data.password) {
      yield put(setRegError((response as any).response?.data.password[0]))
    } else if ((response as any).response?.data.email) {
      yield put(setRegError((response as any).response?.data.email[0]))
    } else if ((response as any).response?.data.username) {
      yield put(setRegError((response as any).response?.data.username[0]))
    } else if ((response as any).response?.status >= 500) {
      yield put(setRegError('Внутренняя ошибка сервера.'))
    } else {
      yield put(setRegError('Некорректный ответ от сервера.'))
    }
  }
}

// CARDS SAGAS

function* fetchCardsSaga(action: FetchCardsAction) {
  const data: Promise<AxiosResponse | AxiosError> = yield call(
    cardsAPI.getCards,
    action.payload
  )
  if ((data as unknown as AxiosError).response?.status === 401) {
    yield put(logOut())
  } else {
    yield put(setCards((data as unknown as AxiosResponse).data as CardItemResponse[]))
  }
}

function* addNewCard(action: AddNewCardAction) {
  const { token, column, text } = action.payload
  yield call(cardsAPI.createCard, token, column, text)
  yield call(fetchCardsSaga, fetchCards(token))
  yield put(editNewCardText(column, ''))
  yield put(closeNewCardMenu(column))
}

function* deleteCard(action: DeleteCardAction) {
  const { token, cardId } = action.payload
  const data: DeleteCardResponse | AxiosErrorObject = yield call(cardsAPI.deleteCard, token, cardId)
  if ((data as DeleteCardResponse).status === 204) {
    yield call(fetchCardsSaga, fetchCards(token))
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

export default watcherSaga