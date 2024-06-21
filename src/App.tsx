import { View, Text } from 'react-native'
import React from 'react'
import AppStack from './routes/AppStack';
import {GestureHandlerRootView} from 'react-native-gesture-handler'


const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppStack />
    </GestureHandlerRootView>
  )
 
}

export default App