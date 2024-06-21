import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Separator = () => {
  return (
    <View style={{}} >
        <View style={styles.separator}></View>
    </View>
  )
}

const styles = StyleSheet.create({
    separator: {
        width: '90%',
        height: 0.5,
        backgroundColor: 'gray',
        marginHorizontal: 20,
        marginTop: 20
    }
})
export default Separator