import { StatusBar } from 'expo-status-bar';;
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { store,catched } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider} from 'react-redux'
import Home from './components/Home';
import Search from './components/Search';
import Personal from './components/Personal';
import Forecast from './components/Forecast';
const Stack=createNativeStackNavigator()
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={catched}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen 
               name='Home'
               component={Home}
               />
              <Stack.Screen 
               name='Search'
               component={Search}
               />
              <Stack.Screen 
               name='Personal'
               component={Personal}
               />
              <Stack.Screen 
               name='Forecast'
               component={Forecast}
               />
            </Stack.Navigator>
          </NavigationContainer>
        <StatusBar style='auto' />
      </PersistGate>
    </Provider>   
  );
}

