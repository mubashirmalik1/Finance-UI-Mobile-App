import { FlatList, ListRenderItem, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constants/Colors'
import { IncomeList } from '@/scripts/types'
import { Feather } from '@expo/vector-icons';
import {addIncome} from '@/src/database/incomeOperations'

export default function IncomeBlock({ incomeList }: { incomeList: IncomeList[] }) {

    const [incomes, setIncomes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const handleAddIncome = async (incomeData) => {
        await addIncome(incomeData.name, incomeData.amount, incomeData.date, incomeData.incomeType); // Add the income data to the database
        const updatedIncomes = await getIncomes(); // Refresh the list
        setIncomes(updatedIncomes); // Update the state with the new list
      };

    const renderItems: ListRenderItem<Partial<IncomeList>> = ({ item, index }) => {
        if (index == 0) {
            return (
              <Pressable onPress={() => alert('ok')}>
                <View style={styles.addItemBtn}>
                  <Feather name="plus" size={22} color={'#ccc'}></Feather>
                </View>
      
              </Pressable>
            )
          }
        let amount = item.amount?.split('.');
        let fAmount = amount ? amount[0] : '0';
        let lAmount = amount ? amount[1] : '00';

        let icon = <Feather name="dollar-sign" size={22} color={Colors.white} />
        if (item.name == 'Freelancing') {
            icon = <Feather name="credit-card" size={22} color={Colors.white} />
        }
        else if (item.name == "Interests") {
            icon = <Feather name="briefcase" size={22} color={Colors.white} />
        }

        return (
            <View style={{
                backgroundColor: Colors.grey,
                padding: 20,
                borderRadius: 20,
                marginRight: 15,
                width: 150,
                gap: 10,
            }}>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between', alignItems: "center"}}>
                    <View
                        style={{ borderWidth: 1, borderRadius: 50, borderColor: Colors.white, alignSelf: 'flex-start', padding: 10 }}
                    >
                            {icon}

                    </View>
                    <Pressable onPress={() => { }}>
                        <Text>
                            <Feather name="more-horizontal" size={20} color={Colors.white} />
                        </Text>

                    </Pressable>
                </View>

                <Text style={{ color: Colors.white }}>{item.name}</Text>
                <Text style={{ color: Colors.white, fontWeight: '800', fontSize: 22 }}>
                    {fAmount}.
                    <Text style={{ fontWeight: '500', fontSize: 16 }}>{lAmount}</Text>
                </Text>
            </View>
        );
    };


    const StaticItem = [{ name: 'Add Item' }]

    return (
        <View style={{ marginVertical: 30 }}>
            <Text style={{ color: Colors.white, fontSize: 16,marginBottom: 20  }}>
                My <Text style={{ fontWeight: '900' }}>Income</Text>
            </Text>

            <FlatList
                data={StaticItem.concat(incomeList)}
                renderItem={renderItems}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    addItemBtn: {
        flex: 1,
        borderWidth: 2,
        borderColor: '#666',
        borderStyle: 'dashed',
        borderRadius: 20,
        marginRight: 20,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
      }
})