import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {VictoryPie} from 'victory-native';
import {Svg} from 'react-native-svg';
import {ScrollView, } from 'react-native-gesture-handler';

const DisplayExpenseChart = (type) => {
  const expenses = useSelector(state => state.list);

  const bgColor = name => {
    let Color;
    if (name === 'Food') {
      Color = '#D8BFD8';
    } else if (name === 'Shopping') {
      Color = '#40e0d0';
    } else if (name === 'Others') {
      Color = '#bde0fe';
    } else if (name === 'Sports') {
      Color = '#457b9d';
    } else if (name === 'Beauty and Care') {
      Color = '#E3A9AA';
    }
    return Color;
  };

  const processCategoryDateToDisplay = () => {
    const totalExpense = expenses.filter(expense => expense.type === 'Expense')
    .reduce((total, expense) => total + (Number(expense.amount) || 0),0);

    const categoryMap = {};

    expenses
      .filter(expense => expense.type === 'Expense')
      .forEach(item => {
        const category = item.category;
        const amount = Number(item.amount);

        if (categoryMap[category]) {
        
          categoryMap[category].y += amount;
          categoryMap[category].label = `${(
            (categoryMap[category].y / totalExpense) *
            100
          ).toFixed(0)}%`;
          categoryMap[category].expenseCount += 1;
        } else {
          
          categoryMap[category] = {
            label: `${((amount / totalExpense) * 100).toFixed(0)}%`,
            y: amount,
            expenseCount: 1,
            color: bgColor(category),
            name: category,
            id: item.id,
          };
        }
      });

    return Object.values(categoryMap);
  };

  const chartData = processCategoryDateToDisplay();
  const totalExpense = chartData.reduce((a,b) => a + (b.expenseCount), 0)
  
  // function setSelectedCategoryByName(){
  //   let category = 
  // }
  return (
    <>
      <View style={styles.Chartcontainer}>
        <ScrollView>
          <Svg style={styles.chart}>
            <VictoryPie
              data={chartData}
              colorScale={chartData.map(item => item.color)}
              // animate={{
              //   duration: 2000
              // }}
              labelRadius={({innerRadius}) => innerRadius + 25}
              innerRadius={70}
              events={[{
                target: 'date',
                eventHandlers:{
                  onPress: () => {
                    return [{
                      target: 'labels',
                      mutation: (props) => {
                        let categoryName = chartData[props.index].name
                        setSelectedCategoryByName(categoryName)
                      }
                    }]
                  }
                }
              }]}
            />
          </Svg>
        </ScrollView>
          <View style={styles.totalExpenseData}>
            <Text style={styles.totalExpenseCount}>{totalExpense}</Text>
            <Text style={{color: 'black'}}>Expenses</Text>
          </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  Chartcontainer: {
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    top: 190,
    
  },
  
  chart: {},
  totalExpenseData: {
    position: 'absolute',
    top: '40%',
    left: '45%',  
  },
  totalExpenseCount:{
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  }
});

export default DisplayExpenseChart;

