import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { BaseUrl, key } from './api'
import axios from 'axios'

export const getCity = createAsyncThunk('city/find',async (id)=>{
  return await axios
  .get(`${BaseUrl}/forecast/daily?q=${id}&appid=${key}&cnt=7&units=imperial`)
  .then(({data})=>data)
})

const initialState={
   status:'idle',
   date:{},
    city:[
    'Moscow',
    'London',
    'Paris',
    'Berlin',
      ]
}
const slice=createSlice({
    name:'city',
    initialState,
    reducers:{
      add:(state,action)=>{
        if (!state.city
          .some(x=>x==action.payload)){
          state.city=[
            ...state.city,
            action.payload
          ]
        }
        },
        del:(state,action)=>{
        if (state.city.length>1){
          const newState=state.city
          .filter((_,i)=>i!==action.payload)
          state.city=[...newState]
            }
        }
    },
  extraReducers:{
    [getCity.fulfilled]:(state,{payload})=>{
      state.status = 'get'
      state.date = {...payload}
    },
    [getCity.pending]:(state,action)=>{
      state.status = 'pend'
    },
    [getCity.rejected]:(state,action)=>{
      state.status = 'err'
    }
  }
})

export const action=slice.actions
export default slice.reducer