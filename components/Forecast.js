import { View ,Text, FlatList} from "react-native";
import { Load,styles } from "./style";
import { useEffect, useReducer } from "react";
import {useSelector,useDispatch} from 'react-redux'
import { getCity } from "../store/slice";

export default function Forecast({navigation,route}){
  const data = useSelector((store)=>store.set.date)
  const status = useSelector((store)=>store.set.status)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getCity(route.params.name))
   },[])
  return (
      <>
       {status=='pend'?(
        <Load>
          <Text>
              load...
          </Text>
        </Load>
       ):status=='err'?(
        <Load>
          <Text>
              err...
          </Text>
        </Load>
       ):(
        <View>
          <View style={styles.forBlock}>
            <Text style={styles.forPlace}>
               {route.params.name}
            </Text>
          </View>
          <View style={styles.forBlock}>
            <Text style={styles.forTitle}>
              Detail forecast for a week
            </Text>
          </View>
          <View style={styles.forBlock}>
            <FlatList 
              data={data.list}
              renderItem={({item,index})=>(
                <Date
                 key={index}
                 item={item}
                 i={index}
                />
              )}
              horizontal
             />
          </View>
        </View>
       )}
      </>
  )
}
function Date({item,i}){
  const arrItem=[
    {date:item.temp,name:'Temp'},
    {date:item.feels_like,name:'Feels like'}
       ]
    return (
        <View style={styles.data}>
          <View style={styles.forBlock}>
            <Text style={styles.subTitle}>
                Date {i+1}
            </Text>
          </View>
          <View>
            <Text style={styles.weather}>
              {item.weather[0].description}
            </Text>
          </View>
          <View>
            <Text style={styles.weather}>
              speed:
              <Text style={styles.section}>
                 {item.speed}
              </Text>
            </Text>
          </View>
          <View>
           {arrItem.map(({date,name},i)=>(
              <Temptation
               key={i}
               date={date}
               name={name}
              />
             ))}
          </View>
        </View>
    )
}
function Temptation({date,name}){
const Day=['morn','day','eve','night']
const [state,dispatch]=useReducer(
(prev,next)=>({...prev,...next}),
{morn:"",day:"",eve:"",night:""})
useEffect(()=>{
[...Object.entries(date)]
.forEach(i=>dispatch({[i[0]]:i[1]}))
},[])
return (
    <>
      <View>
        <Text style={styles.feels}>
           {name}
        </Text>
      </View>
       {Day.map((item,i)=>(
         <View key={i}>
           <Text style={styles.days}>
             {item}:
            <Text style={styles.section}>
               {state[`${item}`]} 
            </Text>
          </Text>
        </View>
       ))}
    </>
)
}