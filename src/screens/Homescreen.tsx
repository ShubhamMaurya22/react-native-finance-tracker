import { View, Text ,SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'


// components
import TotalBalance from '../component/Home/TotalBalance'
import Separator from '../component/Home/Separator'
import ExpenseDisplay from '../component/Home/ExpenseDisplay'
import IncomeDisplay from '../component/Home/IncomeDisplay'
import RecentDisplay from '../component/Home/RecentDisplay'
import AddExpenseButton from '../component/Home/AddExpenseButton'


const Homescreen = () => {
  const [selectedTab, setSelectedTab] = useState(0)

  const getMonth = () => {
    const month = new Date();
    return month.toLocaleString('default', {
      month: 'long'
    })

  }
  return (
<>
    <SafeAreaView>

      <TotalBalance />
      <Separator />

      <View style={styles.switchContainer}>
        <View style={styles.switchBotton}>

          <TouchableOpacity 
            style={[styles.expenseBtn, {backgroundColor: selectedTab== 0 ? '#000': '#C5C5C5'}]}
            onPress={() => {setSelectedTab(0)}}>
            <Text style={[styles.switchBtnText, {color: selectedTab==0 ? '#fff' : '#000'}]}>
              Expenses
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.incomeBtn, {backgroundColor: selectedTab== 1 ? '#000': '#C5C5C5'}]} 
            onPress={() => {setSelectedTab(1)}}>
          <Text style={[styles.switchBtnText, {color: selectedTab==1 ? '#fff' : '#000'}]}>
            Income
          </Text>
          </TouchableOpacity>

        </View>
        <View style={styles.month}>
              <Text style={[styles.switchBtnText, {color: 'black'}]}>{getMonth()}</Text>
        </View>
      </View>

      {selectedTab == 0 ? <ExpenseDisplay/> : <IncomeDisplay />}

      
      <RecentDisplay />
    </SafeAreaView>
      <AddExpenseButton />
      </>
   

  )
}

const styles = StyleSheet.create({
  switchContainer:{
    marginVertical: 30,
    justifyContent: 'center',
    alignItems:'center',
    flexDirection: 'row',
    marginHorizontal: 5,
    
  },
  switchBotton:{
    width: '60%',
    height: 60,
    borderWidth: 0.5,
    borderRadius: 30,
    borderColor: '#C5C5C5',
    marginRight: 5,
    backgroundColor: '#C5C5C5',
    flexDirection: 'row',
    alignItems: 'center',
  },
 
  expenseBtn: {
    width: '50%',
    height: '100%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  incomeBtn: {
    width: '50%',
    height: '100%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  switchBtnText: {
    fontSize: 18,
    fontWeight: '600'
  },
  month:{
    width: '35%',
    height: 60,
    borderWidth: 0.5,
    borderRadius: 30,
    borderColor: '#C5C5C5',
    backgroundColor: '#C5C5C5',
    justifyContent: 'center',
    alignItems: 'center'
  },

  // modal style
  container: {
    width: 70,
    height: 70,
    
    position: 'absolute',
    top: '100%',
    right: 16 ,
    bottom: 16
  },
  plusButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#003049',
    borderRadius: 35,
    bottom: 30

  },
})

export default Homescreen