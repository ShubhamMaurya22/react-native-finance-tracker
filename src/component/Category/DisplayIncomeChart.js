import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {VictoryPie} from 'victory-native';
import {Svg} from 'react-native-svg';
import {ScrollView, } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';

const DisplayIncomeChart = (type) => {
  const expenses = useSelector(state => state.list);

  const bgColor = name => {
    let Color;
    if (name === 'Salary') {
      Color = '#E8CFA8';
    } else if (name === 'Business') {
      Color = '#AA9EA0';
    } else if (name === 'Investment') {
      Color = '#CdEDfe';
    } else if (name === 'Other') {
      Color = '#Ae7b9d';
    } else if (name === 'Gift') {
      Color = '#AEEcAE';
    }
    return Color;
  };

  const processCategoryDateToDisplay = () => {
    const totalExpense = expenses.filter(expense => expense.type === 'Income')
    .reduce((total, expense) => total + (Number(expense.amount) || 0),0);

    console.log(totalExpense, 'total amount')

    const incomeCategoryMap = {};

    expenses
      .filter(expense => expense.type === 'Income')
      .forEach(item => {
        const category = item.category;
        console.log(category);
        const amount = Number(item.amount);

        if (incomeCategoryMap[category]) {
        
            incomeCategoryMap[category].y += amount;
          incomeCategoryMap[category].label = `${(
            (incomeCategoryMap[category].y / totalExpense) *
            100
          ).toFixed(0)}%`;
          incomeCategoryMap[category].expenseCount += 1;
        } else {
          
            incomeCategoryMap[category] = {
            label: `${((amount / totalExpense) * 100).toFixed(0)}%`,
            y: amount,
            expenseCount: 1,
            color: bgColor(category),
            name: category,
            id: item.id,
          };
        }
      });
console.log(Object.values(incomeCategoryMap, 'value'))
    return Object.values(incomeCategoryMap);
  };

  const chartData = processCategoryDateToDisplay();

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
              labelRadius={({innerRadius}) => innerRadius + 15}
              innerRadius={70}
              
              events={[
                {
                  target: 'labels',
                  eventHandlers: {
                    onClick: () => {
                      console.log("click in data");
                      return [
                        {
                          target: 'data',
                          mutation: props => {
                            const fill = props.style && props.style.fill;
                            return fill === '#c43a31'
                              ? null
                              : {style: {fill: '#c43a31'}};
                          },
                        },
                        {
                          target: 'labels',
                          mutation: () => {
                            return {text: 'clicked'};
                          },
                        },
                      ];
                    },
                  },
                },
              ]}
            />
          </Svg>
        </ScrollView>
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
  
});

export default DisplayIncomeChart;

