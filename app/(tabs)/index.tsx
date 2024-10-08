import ExpenseBlock from '@/components/ExpenseBlock';
import Header from '@/components/Header';
import MyExpense from '@/components/MyExpense';
import Colors from '@/constants/Colors';
import { Stack, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { Image, StyleSheet, Platform, Text, View, ScrollView } from 'react-native';
import ExpenseList from "@/data/expenseList.json"
import IncomeList from "@/data/income.json"
import SpendingList from "@/data/spending.json"
import IncomeBlock from '@/components/IncomeBlock';
import SpendingBlock from '@/components/SpendingBlock';
import { setupDatabase } from '@/src/database/setup';


export default function HomeScreen() {
   useEffect(()=>{
    setupDatabase();
   }, [])
  return (
    <>
      <Stack.Screen options={{
        header: () => <Header />
      }}
      />
      <View style={[styles.container, { paddingTop: 70 }]}>
        <ScrollView showsVerticalScrollIndicator={false} style={{gap:30}}>
          <MyExpense />
          <ExpenseBlock />
          <IncomeBlock incomeList={IncomeList}/>
          <SpendingBlock spendingList={SpendingList}/>
        </ScrollView>
      </View>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
    paddingHorizontal: 20

  },
  text: {
    color: Colors.white
  }
});
