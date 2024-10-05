import { Tabs } from 'expo-router';
import React from 'react';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import {  View } from 'react-native';
import Colors from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';



export default function TabLayout() {

  return (
    <>
        <Tabs screenOptions={{
      tabBarStyle:{
        backgroundColor: Colors.grey,
        position: 'absolute',
        bottom: 40,
        justifyContent:'center',
        alignSelf:'center',
        height:63,
        marginHorizontal:120,
        paddingHorizontal:10,
        paddingVertical:8,
        paddingBottom:8,
        borderColor:'#333',
        borderRadius:40,
        borderWidth:1,
        borderTopWidth:1,
        borderTopColor:'#333',
      },
      tabBarShowLabel:false,
      tabBarActiveTintColor:Colors.white,
      tabBarInactiveTintColor: '#999'
    }}>

      <Tabs.Screen name="index" options={{
        title: 'Home',
        tabBarIcon: ({ color, focused }) => (
          <View style={{
            padding: 12,
            borderRadius: 30,
            backgroundColor: focused ? Colors.tintColor : Colors.grey
          }}>
            <SimpleLineIcons size={18} name="pie-chart" color={color} />
          </View>
        )
      }} />
      <Tabs.Screen name="transactions" options={{
        title: 'Transactions',
        tabBarIcon: ({ color, focused }) => (
          <View style={{
            padding: 12,
            borderRadius: 30,
            backgroundColor: focused ? Colors.tintColor : Colors.grey
          }}>
            <AntDesign size={18} name="swap" color={color} />
          </View>
        )
      }} />
      <Tabs.Screen name="profile" options={{
        title: 'Profile',
        tabBarIcon: ({ color, focused }) => (
          <View style={{
            padding: 12,
            borderRadius: 30,
            backgroundColor: focused ? Colors.tintColor : Colors.grey
          }}>
            <SimpleLineIcons size={18} name="user" color={color} />
          </View>
        )
      }} />

    </Tabs >
    <StatusBar style="light" />
    </>

  );
}
