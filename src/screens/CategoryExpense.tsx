import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../component/Category/Header';
import DateDisplay from '../component/Category/DateDisplay';
import SelectChartType from '../component/Category/SelectChartType';


const CategoryExpense = () => {
  return (
    <SafeAreaView style={{margin: 15,}}>
     <Header />
     <DateDisplay />
     <SelectChartType /> 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

})

export default CategoryExpense