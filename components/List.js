import axios from 'axios'
import {View,Text,FlatList,ImageBackground,TouchableOpacity} from 'react-native'
import { BaseUrl,key } from '../store/api'
import { useState,useEffect, useMemo } from 'react';
import { Load ,styles,Main} from './style';
import { back } from '../store/api';
export default function Town({id,nav,children}){
    const urls=[
      `${BaseUrl}/weather?q=${id}&appid=${key}&units=imperial`,
      `${BaseUrl}/forecast/daily?q=${id}&appid=${key}&units=imperial`
    ]
    const [state,setState]=useState({day:null,week:null})
    const [err,setErr]=useState(false)
    const Back=useMemo(()=>{
    return {
     uri:back[[0,1,2,3,4,5][Math.floor(Math.random()*6)]]
      }
    },[id])
    useEffect(()=>{
    const cancelTaken=axios.CancelToken.source()
    async function Call(){
     return await Promise.allSettled(urls.map(item=>axios.get(item)))
     .then(res=>setState({day:res[0].value.data,week:res[1].value.data}))
     .catch(()=>setErr(true))
    }
     Call()
    return ()=>{
     cancelTaken.cancel()
      }
    },[id])
    const Link=(i)=>{
     nav.navigate('Forecast',{name:i})
    }
    const {day,week}=state
    if (!day||!week) return <Load><Text>load..</Text></Load>
    if (err) return <Load><Text>err..</Text></Load>
   return (
      <Main>
        <ImageBackground style={styles.image} source={Back}>
          <View style={styles.block}>
            <Text style={styles.title}>
              {day.name}
            </Text>
          </View>
          <View>
            <Text style={styles.main}>
               {day.weather[0].main}
            </Text>
          </View>
          <View>
            <Text style={styles.main}>
              Country:
              <Text style={styles.section}>
                 {day.sys.country} 
              </Text>
            </Text>
          </View>
          <View>
            <Text style={styles.main}>
               Wind speed:
               <Text style={styles.section}>
                  {day.wind.speed}
               </Text>
             </Text>
           </View>
           <View>
             <Text style={styles.main}>
                Temp:
               <Text style={styles.section}>
                  {day.main.temp}
               </Text>
                {"  "}
                Feels:
               <Text style={styles.section}>
                  {day.main.feels_like}
               </Text>
             </Text>
           </View>
           <View>
             <Text style={styles.main}>
                Min Temp:
               <Text style={styles.section}>
                  {day.main.temp_min}
               </Text>
                {"  "}
                Max Temp:
               <Text style={styles.section}>
                  {day.main.temp_max}
               </Text>
             </Text>
           </View>
           <View>
             <Text style={styles.main}>
                Coordinates:
             </Text>
           </View>
           <View>
             <Text style={styles.main}>
                Lat:
               <Text style={styles.section}>
                  {day.coord.lat}
               </Text>
                {"  "}
                Lon:
               <Text style={styles.section}>
                  {day.coord.lon}
               </Text>
             </Text>
           </View>
           <View>
           </View>
           <View style={styles.buttons}>
            {children[0]}
             <View>
               <Text style={styles.main}>
                 Sunrise:
                 <Text style={styles.section}>
                    {day.sys.sunrise}
                 </Text>
                  {"  "}
                  Sunset:
                 <Text style={styles.section}>
                    {day.sys.sunset}
                 </Text>
               </Text>
             </View>
            {children[1]}
           </View>
           <View>
             <Text style={styles.main}>
                Humidity:
               <Text style={styles.section}>
                  {day.main.humidity}
               </Text>
             </Text>
           </View>
           <FlatList
            data={week.list}
            renderItem={({item,index})=>(
               <Week
                key={index}
                item={item}
                i={index}
                />
               )}
               horizontal
              />
            <View>
              <TouchableOpacity style={styles.link}
                onPress={()=>Link(day.name)}>
               <Text style={styles.main}>
                   Detail forecast
               </Text>
             </TouchableOpacity>
           </View>
           {children[2]}
         </ImageBackground>
       </Main>
    )
    }
 function Week({item,i}){
 return (
     <View style={styles.week}>
       <View>
         <Text style={styles.date}>
            Date {i+1}
         </Text>
       </View>
       <View>
         <Text style={styles.deg}>
            day:
           <Text style={styles.section}>
              {item.temp.day}
           </Text>
         </Text>
         <Text style={styles.deg}>
             night:
           <Text style={styles.section}>
              {item.temp.night}
           </Text>
         </Text>
       </View>
     </View>
     )
   }