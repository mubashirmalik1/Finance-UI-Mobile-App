import { FlatList, ListRenderItem, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '@/constants/Colors'
//import { ExpenseList } from '@/scripts/types'
import { Feather } from '@expo/vector-icons'
import {getExpenseTypes} from '@/src/database/expenseOperations'

// Define the ExpenseList type
type ExpenseList = {
  id: number;
  name: string;
  price?: string;
  percentage?: string;
};


const ExpenseBlock = () => {
  const [expenseList, setExpenseList] = useState<ExpenseList[]>([]);

   // Fetch expenses from SQLite database on component mount
   useEffect(() => {
    fetchExpenseTypes();
  }, []);

  const fetchExpenseTypes = async () => {
    try {
      const types = await getExpenseTypes();
      const expenses: ExpenseList[] = [];
      for (const row of types) {
          expenses.push({
            id: row.id,
            name: row.name,
            price: '0.00', 
            percentage: '0'
          });
        }
      setExpenseList(expenses);
    } catch (error) {
      console.error('Error fetching expense types:', error);
    } finally {
    //  setLoading(false);
    }
  };
  
  const renderItem: ListRenderItem<Partial<ExpenseList>> = ({ item, index }) => {
    if (index == 0) {
      return (
        <Pressable onPress={() => alert('ok')}>
          <View style={styles.addItemBtn}>
            <Feather name="plus" size={22} color={'#ccc'}></Feather>
          </View>

        </Pressable>
      )
    }
    let amount = item.price?.split('.');
    let fAmount = amount? amount[0]:'0';
    let lAmount = amount? amount[1]:'00';
    return (
      <View style={[styles.ExpenseBlock, {
        backgroundColor:
          item.name == 'Food'
            ? Colors.blue : item.name == 'Saving'
              ? Colors.white
              : Colors.tintColor
      }]}>

        <Text style={[styles.expenseBlockTxt1, {
          color:
            item.name == 'Food'
              ? Colors.black
              : item.name == 'Saving'
                ? Colors.black
                : Colors.white
        }]}>{item.name}</Text>

        <Text style={[styles.expenseBlockTxt2, {
          color:
            item.name == 'Food'
              ? Colors.black
              : item.name == 'Saving'
                ? Colors.black
                : Colors.white
        }]}>${fAmount}.
          <Text style={{ fontSize: 16 }}>{lAmount}</Text>
        </Text>

        <View style={styles.expenseBlockView3}>
          <Text style={[styles.expenseBlockTxt1, {
            color:
              item.name == 'Food'
                ? Colors.black
                : item.name == 'Saving'
                  ? Colors.black
                  : Colors.white
          }]}>{item.percentage}%</Text>
        </View>
      </View>
    )
  };

  const StaticItem = [{ name: 'Add Item' }]
  return (
    <FlatList data={StaticItem.concat(expenseList)}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  ExpenseBlock: {
    backgroundColor: Colors.tintColor,
    padding: 15,
    width: 100,
    marginRight: 15,
    borderRadius: 15,
    marginTop: 30,
    gap: 15,
    alignItems: 'flex-start',
    justifyContent: 'space-between'

  },
  expenseBlockTxt1: {
    fontSize: 16,
    color: Colors.white,
  },
  expenseBlockTxt2: {
    fontSize: 22,
    color: Colors.white,
    fontWeight: '700'
  },
  expenseBlockView3: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 10
  },
  addItemBtn:{
    flex: 1,
     borderWidth: 2,
      marginTop: 30,
       borderColor: '#666', 
       borderStyle: 'dashed',
        borderRadius: 20, 
        marginRight: 20, 
        padding: 20,
         justifyContent: 'center', 
         alignItems: 'center'
  }
})

export default ExpenseBlock
