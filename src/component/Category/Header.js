import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const Header = () => {
  
  return (
    <View style={styles.container}>
      <TouchableOpacity >
        <Ionicons name='arrow-back' size={33} color='#00b4d8' />
      </TouchableOpacity>
      
        <Entypo name='dots-three-horizontal' size={33} color='#00b4d8' /> 
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default Header