import {createSlice} from '@reduxjs/toolkit'

const initialState={
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
        if (!state.city.some(x=>x==action.payload)){
          state.city.push(action.payload)
        }
        },
        del:(state,action)=>{
        if (state.city.length>1){
         const id=state.city.findIndex(x=>x==action.payload)
          state.city.splice(id,1)
            }
        }
    }
})
export const action=slice.actions
export default slice.reducer