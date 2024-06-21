import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import React,{useState} from 'react'
import Category from './DisplayExpenseChart'
import DisplayIncomeChart from './DisplayIncomeChart'


const SelectChartType = () => {
    const [type, setType] = useState(0)
  return (
    <>
    <View style={styles.container}>
      <Text style={styles.categoryText}>CATEGORIES</Text>
      <View style={styles.switchBtn}>
          <TouchableOpacity  style={[styles.switchBtnText,  {backgroundColor: type === 0 ? '#00b4d8' : '#91E0FF'} ]} onPress={() => setType(0)}>
            <Text style={[styles.text, {color: type === 0 ? 'black' : '#212121'}]}>Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.switchBtnText, {backgroundColor: type === 1 ? '#00b4d8' : '#91E0FF'}]} onPress={() => setType(1)}>
            <Text style={[styles.text, {color: type === 1 ? 'black' : '#212121'}]}>Income</Text>
          </TouchableOpacity>
        </View>
    </View>
    {type === 0 ? <Category/> : <DisplayIncomeChart/>}
        
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
    },
    categoryText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#00b4d8',
        
      },
      switchBtn: {
        flexDirection: 'row',
        backgroundColor: '#91E0FF',
        width: 150,
        height: 40,
        alignItems: 'center' ,
        justifyContent: 'space-around',
        borderWidth: 0.5,
        borderColor: '#91E0FF',
        borderRadius: 40,
      
      },
      switchBtnText: {
        flex: 1,
        height:40,
        width: 74,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
      },
      text:{
        fontSize: 16,
        fontWeight: 'bold'
      }
})

export default SelectChartType
