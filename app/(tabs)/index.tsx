import ExpenseBlock from '@/components/ExpenseBlock';
import Header from '@/components/Header';
import MyExpense from '@/components/MyExpense';
import Colors from '@/constants/Colors';
import { Stack, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Platform, Text, View, ScrollView, RefreshControl } from 'react-native';
import IncomeBlock from '@/components/IncomeBlock';
import SpendingBlock from '@/components/SpendingBlock';
import { setupDatabase } from '@/src/database/setup';
import { getUserById } from '@/src/database/userOperations';


export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false); 
  const [fullName, setFullName] = useState('User');
  const [image, setImage] = useState('https://avatar.iran.liara.run/public/5');
  
   useEffect(()=>{
    setupDatabase();
    fetchUser();
   }, [])

   const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setupDatabase(); 
      setRefreshing(false); 
      fetchUser();
    }, 1000); 
  };
  const fetchUser = async () => {
    try {
        const response = await getUserById(1);
        setFullName(response.name);
        setImage(response.image);
    } catch (error) {
        console.error('Error fetching user:', error);
    }
}

  return (
    <>
      <Stack.Screen options={{
        header: () => <Header fullName={fullName} image={image} />
      }}
      />
      <View style={[styles.container, { paddingTop: 70 }]}>
        <ScrollView 
        showsVerticalScrollIndicator={false}
         style={{gap:30}}
         refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
         >
          <MyExpense />
          <ExpenseBlock />
          <IncomeBlock />
          <SpendingBlock/>
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
