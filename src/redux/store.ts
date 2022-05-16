import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
//@ts-ignore
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import { authReducer } from "./reducers/auth-reducer";
import { cardsReducer } from "./reducers/cards-reducer";
import watcherSaga from "./sagas";

export const rootReducer = combineReducers({
  auth: authReducer,
  cards: cardsReducer
})

const persistConfig = {
  key: 'root',
  storage
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  // reducer: rootReducer,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [ FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  }).concat(sagaMiddleware),
  devTools: true
})
sagaMiddleware.run(watcherSaga)

export const persistor = persistStore(store)

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store