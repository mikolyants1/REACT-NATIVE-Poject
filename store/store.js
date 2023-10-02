import slice,{action} from "./slice";
import storage from 'redux-persist/lib/storage'
import {persistReducer,persistStore,} from 'redux-persist'
import {combineReducers,configureStore,bindActionCreators} from '@reduxjs/toolkit'
import {useDispatch} from 'react-redux'
import { CityApi } from "./api";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
const config={
    key:'root6',
    storage
}
const combine=combineReducers({
    set:slice,
    [CityApi.reducerPath]:CityApi.reducer
})
const persist=persistReducer(config,combine)
export const store=configureStore({
    reducer:persist,
    middleware:getDefaultMiddleware=>
    getDefaultMiddleware().concat(CityApi.middleware)
}) 
setupListeners(store.dispatch)
export const useAction=()=>bindActionCreators(action,useDispatch())
export const catched=persistStore(store)