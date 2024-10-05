import ExpenseBlock from '@/components/ExpenseBlock';
import Header from '@/components/Header';
import MyExpense from '@/components/MyExpense';
import Colors from '@/constants/Colors';
import { Stack, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { Image, StyleSheet, Platform, Text, View, ScrollView } from 'react-native';
import ExpenseList from "@/data/expenseList.json"


export default function HomeScreen() {
  //const navigation = useNavigation();

  // useEffect(()=>{
  //   navigation.setOptions({headerShown:false})
  // })
  return (
    <>
      <Stack.Screen options={{
        header: () => <Header />
      }}
      />
      <View style={[styles.container, { paddingTop: 70 }]}>
        <ScrollView showsVerticalScrollIndicator={false} style={{gap:30}}>
          <MyExpense />
          <ExpenseBlock expenseList={ExpenseList}/>
        </ScrollView>
      </View>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  justifyContent: 'center',
    //  alignItems: 'center',
    backgroundColor: Colors.black,
    paddingHorizontal: 20
  },
  text: {
    color: Colors.white
  }
});
