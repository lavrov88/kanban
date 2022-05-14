import { CardsActions } from "../../types/actions-types"
import { CardItemResponse } from "../../types/api-types"

type CardsArray = CardItemResponse[] | []

const emptyColumnObj = {
  cards: [] as CardsArray,
  newCardText: '',
  newCardIsOpened: false
}

const initialState = {
  0: { ...emptyColumnObj },
  1: { ...emptyColumnObj },
  2: { ...emptyColumnObj },
  3: { ...emptyColumnObj }
}
export type ColumnObj = typeof emptyColumnObj
export type CardsState = typeof initialState

export const cardsReducer = (state: CardsState = initialState, action: CardsActions): CardsState => {
  switch (action.type) {
    case 'SET_CARDS':
    return {
      ...state,
      0: {
        ...state[0],
        cards: action.payload.filter(c => c.row === '0')
      },
      1: {
        ...state[1],
        cards: action.payload.filter(c => c.row === '1')
      },
      2: {
        ...state[2],
        cards: action.payload.filter(c => c.row === '2')
      },
      3: {
        ...state[3],
        cards: action.payload.filter(c => c.row === '3')
      },
    }

    case 'UPDATE_COLUMN_LOCALLY':
      return {
        ...state,
        [action.payload.column]: {
          ...state[action.payload.column],
          cards: [...action.payload.cards]
        }
      }

    case 'OPEN_NEW_CARD_MENU':
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          newCardIsOpened: true
        }
      }

    case 'CLOSE_NEW_CARD_MENU':
    return {
      ...state,
      [action.payload]: {
        ...state[action.payload],
        newCardIsOpened: false
      }
    }

    case 'EDIT_NEW_CARD_TEXT':
    return {
      ...state,
      [action.payload.column]: {
        ...state[action.payload.column],
        newCardText: action.payload.text
      }
    }

    default:
      return state
  }
}