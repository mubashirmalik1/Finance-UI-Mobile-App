import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { SpendingList } from '@/scripts/types'
import { Feather } from '@expo/vector-icons'

const SpendingBlock = ({ spendingList }: { spendingList: SpendingList[] }) => {

    const Spending = spendingList.map((item) => {
        return (
            <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:10 }}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <View style={{backgroundColor:Colors.grey, padding:13, borderRadius:50, marginRight:10}}>
                        <Feather name="dollar-sign" size={22} color={Colors.white} />
                    </View>
                    <View style={{gap:6}}>
                        <Text style={{color:Colors.white, fontSize:17, fontWeight:'700'}}>{item.name}</Text>
                        <Text style={{color:Colors.white}}>{item.date}</Text>
                    </View>
                </View>
                <View>
                    <Text style={{color:Colors.white,fontSize:17, fontWeight:'700'}}>
                        ${item.amount}
                    </Text>
                </View>
            </View>
        )
    })

    return (
        <View>
            <Text style={{ color: Colors.white, fontSize: 16 }}>
                May <Text style={{ fontWeight: '900' }}>Spendings</Text>
            </Text>
            <View>
           {Spending}
            </View>
        </View>
    )
}

export default SpendingBlock

const styles = StyleSheet.create({})