import { View, Text, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '@/constants/Colors'
import { getUserById } from '@/src/database/userOperations'

const Header = ({fullName , image}) => {

  return (
    <SafeAreaView style={{
        flex:1,
        backgroundColor:Colors.black
    }}>
        <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            height:70,
            alignItems:'center',
            paddingHorizontal:20
        }}>
            <View style={{flexDirection:"row",alignItems:'center'}}>
                <Image
                source={{uri:image}}
                style={{height:50, width:50, borderRadius:50}}
                />
                <View style={{marginLeft:10}}>
                    <Text style={{color:Colors.white, fontSize:12}}>Hey, <Text style={{textTransform:'capitalize'}}>{fullName}</Text></Text>
                    <Text style={{color:Colors.white, fontSize:16}}>{new Date().toLocaleString('default', { month: 'long' })} <Text style={{fontWeight:700}}> Budget</Text></Text>
                </View>
                
            </View>
            <View>
                <Pressable style={{borderRadius:10, borderColor: Colors.white, borderWidth:1,paddingHorizontal:10, paddingVertical:10}} >
                    <Text style={{color:Colors.white}}>
                      My Transactions 
                    </Text>
                    </Pressable>
            </View>
        </View>
        
    </SafeAreaView>
  )
}

export default Header