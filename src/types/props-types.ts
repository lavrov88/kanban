import { CardsState, ColumnObj } from "../redux/reducers/cards-reducer"
import { AppDispatch } from "../redux/store"
import { ColumnNumber } from "./api-types"

export type BoardProps = {
  cards: CardsState
  dispatch: AppDispatch
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
  id: number
  text: string
  token: string
  dispatch: AppDispatch
}