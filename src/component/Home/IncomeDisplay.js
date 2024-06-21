import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import {expenseSelectorByType} from '../../features/selector/expenseSelectorByType'

const IncomeDisplay = () => {
    
    const income = useSelector((state) => expenseSelectorByType(state))
  return (
    <View style={styles.container}>
    <View style={styles.day}>
       <Text style={styles.dayText}>Day</Text>
       <Text style={styles.dayExpense}>{income.day.income} &#8377; </Text>
    </View>
    <View style={styles.day}>
       <Text style={styles.dayText}>Week</Text>
       <Text style={styles.dayExpense}>{income.week.income} &#8377; </Text>
    </View>
    <View style={styles.day}>
       <Text style={styles.dayText}>Month</Text>
       <Text style={styles.dayExpense}>{income.month.income} &#8377; </Text>
    </View>
   </View>
 )
}

const styles=StyleSheet.create({
   container: {
       // flex: 1,
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'space-evenly'

   },
   day: {
       width: 120,
       height: 100,
       backgroundColor: '#C5C5C5',
       alignItems: 'center',
       justifyContent: 'center',
       borderWidth: 0.5,
       borderColor: '#C5C5C5',
       borderRadius: 30
   },
   dayText: {
       color: '#000',
       fontSize: 18,
       fontWeight: '400',
       marginBottom: 5
   },
   dayExpense: {
       color: '#000',
       fontSize: 22,
       fontWeight: '600',
   }
})

export default IncomeDisplay