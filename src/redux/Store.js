import userReducer from './Slice/UserSlice.js';
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {persistStore} from 'redux-persist'
import {configureStore} from "@reduxjs/toolkit"
import {combineReducers} from "@reduxjs/toolkit"

const persistConfig = { key: 'root', storage, version: 1 };
const reducer = combineReducers({
  userReducer,
})
const persistedReducer = persistReducer(persistConfig,reducer)
const store = configureStore({
  reducer:persistedReducer
})
const persistor = persistStore(store)

export {store,persistor}