import { View, Text , StyleSheet} from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'

const DateDisplay = () => {

    const todayDate = () => {
        const myDate = new Date()
        return myDate.toLocaleString('default', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'   
        })
    }
  return (
    <View>
        <Text style={styles.title}>My Expenses</Text>
        
      <View style={styles.container}>
        <AntDesign name='calendar' size={33}  />
        <View style={styles.dateContainer}>
            <Text style={styles.date}>{todayDate()}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    title: {
        marginTop: 20,
        fontSize: 26,
        fontWeight: 'bold',
        color: '#00b4d8'
    },
    container:{
        flexDirection: 'row',
        marginTop: 30,
        marginLeft: 20
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 35,
    },
    date: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    }
})

export default DateDisplay