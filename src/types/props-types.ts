import { CardsState, ColumnObj } from "../redux/reducers/cards-reducer"
import { AppDispatch } from "../redux/store"
import { ColumnNumber } from "./api-types"

export type HeaderProps = {
  isLogged: boolean
  currentUsername: string | null
  dispatch: AppDispatch
}

export type BoardProps = {
  cards: CardsState
  dispatch: AppDispatch
  token: string
}

export type ColumnProps = {
  color: ColumnColors
  data: ColumnObj
  name: string
  columnId: ColumnNumber
  dispatch: AppDispatch
}

export type ColumnColors = 'red' | 'blue' | 'yellow' | 'green'

export type CardProps = {
  index: number
  id: number
  text: string
  token: string
  dispatch: AppDispatch
}

export type LoginProps = {
  currentUsername: string | null
  authError: string | null
  regError: string | null
  dispatch: AppDispatch
}

export type LoginFormProps = {
  currentUsername: string | null
  authError: string | null
  dispatch: AppDispatch
}

export type RegFormProps = {
  regError: string | null
  dispatch: AppDispatch
}