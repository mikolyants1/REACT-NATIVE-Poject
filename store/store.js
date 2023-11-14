import slice,{action} from "./slice";
import storage from 'redux-persist/lib/storage'
import {persistReducer,persistStore} from 'redux-persist'
import {combineReducers,configureStore,bindActionCreators} from '@reduxjs/toolkit'
import {useDispatch} from 'react-redux'

const config={
    key:'root6',
    storage
}
const combine=combineReducers({
    set:slice,
})
const persist=persistReducer(config,combine)
export const store=configureStore({
    reducer:persist
}) 
export const useAction=()=>bindActionCreators(action,useDispatch())
export const catched=persistStore(store)