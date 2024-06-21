import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const TotalBalance = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome, Shubham</Text>
        <MaterialCommunityIcons name='bell' size={34} color='#a2d2ff' />
   </View>
 )
}

const styles=StyleSheet.create({
   container: {
       // flex: 1,
       alignItems: 'center',
       justifyContent: 'space-between',
       flexDirection: 'row',
       marginHorizontal: 16,
       marginTop: 20

   },
   welcomeText: {
       color: '#000',
       fontSize: 20,
       fontWeight: '700',
       
   },
   
})

export default TotalBalance