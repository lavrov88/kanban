import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { authReducer } from "./reducers/auth-reducer";
import { cardsReducer } from "./reducers/cards-reducer";
import mySaga from "./sagas";

export const rootReducer = combineReducers({
  auth: authReducer,
  cards: cardsReducer
})
const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
  devTools: true
})
sagaMiddleware.run(mySaga)

// @ts-ignore
window.state = store.getState()

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store