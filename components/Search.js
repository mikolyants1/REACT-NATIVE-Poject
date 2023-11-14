import {  useState } from 'react'
import {View,Text,SafeAreaView,ScrollView,TouchableOpacity} from 'react-native'
import City from './City'
import { BaseUrl,key } from '../store/api'
import axios from 'axios'
import {styles,Input} from './style'
export default function Search({navigation}){
 const [city,setCity]=useState('')
 const [json,setJson]=useState(null)
async function show(id){
return await axios
.get(`${BaseUrl}/weather?q=${id}&appid=${key}&units=imperial`)
.then(({data})=>setJson(data))
 }
const press=()=>{
 if (city!=='') show(city)
}
    return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View>
          <Input 
           onChangeText={setCity} 
           placeholder='what city we are looking for?'
           />
          <View style={styles.serBlock}>
            <TouchableOpacity onPress={press}>
              <Text style={styles.search}>
                  Find
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
         <City 
          nav={navigation}
          item={json}
           />
        </View>
      </ScrollView>
    </SafeAreaView>
    )
}
