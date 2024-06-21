import 'react-native-gesture-handler'
import React from 'react'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {NavigationContainer} from '@react-navigation/native'
import {  View, Dimensions  } from 'react-native';

// screens
import Homescreen from '../screens/Homescreen';
import Accountscreen from '../screens/AccountScreen';
import Addexpense from '../screens/CategoryExpense';

//store 
import {Provider} from 'react-redux'
import {store} from '../store/store'
 
const Tab = createMaterialBottomTabNavigator();
const { width, height } = Dimensions.get("window")

function TabNavigator(){
  return (
    <View style={{
      width,
      height,
  }}>
    <Tab.Navigator
    initialRouteName='Homescreen'
    // activeColor="#fff"
    // inactiveColor="#888"
    barStyle={{ 
        backgroundColor: '#a2d2ff',
        height: 80,
        position: 'absolute',
        left: 16,
        right: 16,
        bottom: 16,
        borderRadius: 40,
        
    }}
 
    
    >
        <Tab.Screen 
         name='Homescreen'
         component={Homescreen} 
         options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
                <Ionicons  name='home' size={26} color={color} />
            ),
            
          }}
         />
        <Tab.Screen
         name='Category'
         component={Addexpense}
         options={{
            tabBarLabel: 'Category',
            tabBarIcon: ({ color }) => (
              <Ionicons  name='pie-chart' size={26} color={color} />
            ),
            
          }}
         />
          <Tab.Screen 
        name='Account'
         component={Accountscreen} 
         options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({ color }) => (
                <Feather name='user' size={26} color={color} />
            ),
          }}
         />
    </Tab.Navigator> 
    </View>
  )
}
export default function AppStack(){
    return( 
        // <BottomSheetModalProvider>
        <Provider store={store}>
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        </Provider>
        // </BottomSheetModalProvider>
      )
  
}

