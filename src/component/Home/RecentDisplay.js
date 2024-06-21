import { View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {letestExpenseSelector} from '../../features/selector/letestExpenseSelector'
import {useSelector} from 'react-redux'

import colors from '../../../colors'

const RecentDisplay = () => {

    const letestTranscation = useSelector(state => letestExpenseSelector(state))
    
    const icons = (name) => {
        let iconname;
        if(name === 'Food'){
            iconname = 'pizza-outline'          
        } else if(name === 'Shopping'){
            iconname = 'shirt-outline'           
        } else if(name === 'Others'){
            iconname = 'grid-outline'
        }else if(name === 'Sports'){
            iconname = 'basketball-outline'
        }else if(name === 'Beauty and Care'){
            iconname = 'woman-outline'
        }else if(name === 'Salary'){
            iconname = 'logo-euro'
        }else if(name === 'Business'){
            iconname = 'business-outline'
        }else if(name === 'Investment'){
            iconname = 'stats-chart-outline'
        }else if(name === 'Gift'){
            iconname = 'gift-outline'
        }
    return iconname
    }

    const bgColor = (name) => {
        let Color;
        if(name === 'Food'){
            Color = '#D8BFD8'
        } else if(name === 'Shopping'){
            Color = '#40e0d0'
        } else if(name === 'Others'){
            Color = '#bde0fe'
        }else if(name === 'Sports'){
          Color = '#457b9d'
        }else if(name === 'Beauty and Care'){
          Color = '#E3A9AA'
        }else if(name === 'Salary'){
            Color = '#E8CFA8'
        }else if(name === 'Business'){
            Color = '#AA9EA0'
        }else if(name === 'Investment'){
            Color = '#CdEDfe'
        }else if(name === 'Gift'){
            Color = '#AEEcAE'
        }
        return Color
    }
     
  return (
    <View style={styles.recentContainer}>
        <Text style={styles.headline}>Recent Transaction</Text>
      
      {letestTranscation ? (
        <FlatList
          data={letestTranscation}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            // <TouchableOpacity key={item.id}>
          
              <View style={styles.recentItems}>
                <View style={[styles.icons, {backgroundColor: bgColor(item.category)}]}>
                     <Ionicons name={icons(item.category)} size={30} color='black' />
                </View>
                <View style={styles.itemDetails}>
                        <Text style={styles.itemText}>{item.category}</Text>
                </View>
                <Text style={[styles.itemPrice, { color: item.type === 'Income' ? 'green' : '#FF3E4D' }]}>{item.type === 'Income' ? '+': '-'}{item.amount} &#8377;</Text>
            </View>
            
            // </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.recentTransaction}>No recent transactions </Text>
      )}

    </View> 
  )
}

const styles = StyleSheet.create({
    recentContainer: {
        marginVertical: 30,
        // overflow: 'hidden' 
    },
    headline: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
        marginHorizontal: 20,
        marginBottom: 10
    },
    recentItems: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        marginHorizontal: 20,
    },
    icons:{
        width: 60, 
        height: 60,
        // backgroundColor: '#40e0d0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30

    },
    itemText:{
        fontSize: 22,
        fontWeight: '700',
        color: '#000',
    },
    itemPrice: {
        fontSize: 22,
        fontWeight: '700',
        color: '#000',
        marginLeft: 'auto'
    },
    itemDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
      },
    recentTransaction: {
        textAlign: 'center',
        fontSize: 20,

    }
})

export default RecentDisplay