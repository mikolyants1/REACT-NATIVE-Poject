import {View,Button,Text,SafeAreaView,ScrollView,TouchableOpacity, Alert} from 'react-native'
import {useSelector} from 'react-redux'
import { styles } from './style';
import Town from './List';
import { useState } from 'react';
import { useAction } from '../store/store';
export default function Home({navigation:nav}){
 const cities=useSelector((store)=>store.set.city)
 const [count,setCount]=useState(0)
 const {del}=useAction()
 const delItem=()=>{
  del(count)
  setCount(0)
 }
 return (
     <SafeAreaView style={styles.container}>
       <ScrollView style={styles.scroll}>
        <Button 
          title='find the City' 
          onPress={()=>nav.navigate('Search')} 
         />
         <View>
          <Town id={cities[count]} nav={nav}>
            <Prev 
             step={count!==0}
             set={setCount}
              />
            <Next
             step={count!==cities.length-1}
             set={setCount}
              />
            <Button
             title='delete City'
             onPress={delItem}
             />
          </Town>
        </View>
        <View style={styles.points}>
         {cities.map((_,i)=>(
           <Point
            key={i}
            id={i}
            con={count}
           />
         ))}
        </View>
      </ScrollView>
    </SafeAreaView>
    )
}
function Prev({step,set}){ 
 const add=()=>{
  set(prev=>step?prev-1:prev)
  if (!step) 
  Alert.alert('Warning','It is the first city')
    }
  return (
  <View style={styles.but}>
    <TouchableOpacity onPress={add}>
       <Text style={styles.text}>
          Prev
      </Text>
    </TouchableOpacity>
  </View>
  )
  
}
function Next({step,set}){
 const add=()=>{
  set(prev=>step?prev+1:prev)
  if (!step) 
  Alert.alert('Warning','It is the last city')
  }
  return (
  <View style={styles.but}>
    <TouchableOpacity onPress={add}>
      <Text style={styles.text}>
          Next
      </Text>
    </TouchableOpacity>
  </View>
    )
  }
function Point({id,con}){
  const name=id==con?'active':'pend'
    return (
      <View style={styles.point}>
        <Text style={styles[name]}>
            ·
        </Text>
      </View>
    )
  }
