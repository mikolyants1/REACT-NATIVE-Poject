import {View,Text,Button} from 'react-native'
import { styles,Item} from "./style";
export default function City({item,nav}){
if (item){ 
  const Navigate=()=>{
    nav.navigate('Personal',{id:item.name})
  }
    return (
        <Item>
          <View>
            <Text style={styles.serTitle}>
              {item.name}
            </Text>
            <Text style={styles.serMain}>
              country {" "}
              <Text style={styles.section}>
                {item.sys.country}
              </Text>
            </Text>
          </View>
          <View>
            <View>
              <Text style={styles.serMain}>
                 coordinates:
              </Text>
            </View>
            <View>
              <Text style={styles.serMain}>
                 Lat:
                <Text style={styles.section}>
                   {item.coord.lat}
                </Text>
                 {"  "}
                 Lon:
                <Text style={styles.section}>
                   {item.coord.lon}
                </Text>
              </Text>
            </View>
          </View>
          <Button 
           title='more' 
           onPress={Navigate}
           />  
        </Item>
      )  
    }
    return null
}