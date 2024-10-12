import { FlatList, ListRenderItem, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '@/constants/Colors'
import { IncomeList } from '@/scripts/types'
import { Feather } from '@expo/vector-icons';
import {addIncome, deleteAllIncome, getIncomeTypes, getIncomeTypeWithPrice} from '@/src/database/incomeOperations'
import AddIncomeModal from "@/components/AddIncomeModal"

export default function IncomeBlock() {

    const [incomes, setIncomes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [incomeList, setIncomeList] = useState<Partial<IncomeList>[]>([]);



    useEffect(() => {
        const fetchIncomeTypesWithPrice = async () => {
            const incomeTypes = await getIncomeTypeWithPrice();
            setIncomeList(incomeTypes);
        }
        fetchIncomeTypesWithPrice();

    //    const deleteIncomeData = async () => {
    //     await deleteAllIncome(); // Delete the income from the database
    //     const updatedIncomes = await getIncomeTypeWithPrice(); // Refresh the list
    //     console.log(updatedIncomes); // Update the state with the new list
    //    }
    //    deleteIncomeData();

    }, []);

    const handleAddIncome = async (incomeData: { name: any; amount: any; date: any; incomeType: any; }) => {
        await addIncome(incomeData.name, incomeData.amount, incomeData.date, incomeData.incomeType); 
        const updatedIncomes = await getIncomeTypeWithPrice();
        setIncomeList(updatedIncomes); 
      };

    const renderItems = ({ item, index }) => {
        if (index == 0) {
            return (
              <Pressable onPress={() => setModalVisible(true)}>
                <View style={styles.addItemBtn}>
                  <Feather name="plus" size={22} color={'#ccc'}></Feather>
                </View>
      
              </Pressable>
            )
          }
          let fAmount = '0';
          let lAmount = '00';
        if(item.total_amount){
            let total_amount = item.total_amount.toString()
            let amount = typeof total_amount === 'string' ? total_amount.split('.') : ['0', '00'];
            fAmount = amount ? amount[0] : '0';
            lAmount = amount ? amount[1]?amount[1]:'00' : '00'; 
        };
        

        let icon = <Feather name="dollar-sign" size={22} color={Colors.white} />
        if (item.type == 'Investment') {
            icon = <Feather name="trending-up"  size={22} color={Colors.white} />
        }
        else if (item.type == "Gift") {
            icon = <Feather name="gift" size={22} color={Colors.white} />
        }
        else if (item.type == "Salary") {  
            icon = <Feather name="briefcase" size={22} color={Colors.white} />
        }
        else if (item.type == "Interest") {
            icon = <Feather name="credit-card" size={22} color={Colors.white} />
        }
        else if (item.type == "Rental") {
            icon = <Feather name="home" size={22} color={Colors.white} />
        }
        else if (item.type == "Other") {
            icon = <Feather name="box" size={22} color={Colors.white} />
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

                <Text style={{ color: Colors.white }}>{item.type}</Text>
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
            {/* AddIncomeModal */}
        <AddIncomeModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onAddIncome={handleAddIncome} // Pass the function to handle adding income
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