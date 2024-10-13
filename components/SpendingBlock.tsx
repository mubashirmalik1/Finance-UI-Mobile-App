import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '@/constants/Colors'
import { SpendingList } from '@/scripts/types'
import { Feather } from '@expo/vector-icons'
import { getCurrentMonthExpense } from '@/src/database/expenseOperations'


const SpendingBlock = () => {

    const [SpendingList, setSpendingList] =useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await getCurrentMonthExpense();
            setSpendingList(response);
        }
        fetchData();
    }, [])

    const Spending = SpendingList.map((item ,index) => {
       
        return (
            <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:10 }} key={index}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <View style={{backgroundColor:Colors.grey, padding:13, borderRadius:50, marginRight:10}}>
                        <Feather name="arrow-up" size={22} color={Colors.white} />
                    </View>
                    <View style={{gap:6}}>
                        <Text style={{color:Colors.white, fontSize:17, fontWeight:'700'}}>{item.name}</Text>
                        <Text style={{color:Colors.white}}>{item.date}</Text>
                    </View>
                </View>
                <View>
                    <Text style={{color:Colors.white,fontSize:17, fontWeight:'700'}}>
                        Rs {item.amount}
                    </Text>
                </View>
            </View>
        )
    })

    return (
        <View>
            <Text style={{ color: Colors.white, fontSize: 16 }}>
                {new Date().toLocaleString('default', { month: 'long' })} <Text style={{ fontWeight: '900' }}>Spendings</Text>
            </Text>
            <View>
           {Spending}
            </View>
        </View>
    )
}

export default SpendingBlock

const styles = StyleSheet.create({})