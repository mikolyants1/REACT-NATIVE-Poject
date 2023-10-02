import {View,Button} from 'react-native'
import { styles } from './style'
import { useAction } from '../store/store'
import Town from './List'
export default function Personal({navigation,route}){
 const {add}=useAction()
 const set=()=>{
  add(route.params.id)
 }
return (
        <>
         <View style={styles.pers}>
           <Town nav={navigation} id={route.params.id}>
              {[0,1].map(i=><View key={i} />)}
           </Town>
         </View>
         <Button
          title='add city'
          onPress={set}
           />
        </>
    )
}