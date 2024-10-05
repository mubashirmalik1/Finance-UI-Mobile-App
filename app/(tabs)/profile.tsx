import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';


export default function profile() {
  const navigation = useNavigation();

  useEffect(()=>{
    navigation.setOptions({headerShown:false})
  })
  return (
    <View style={styles.container}>
    <Text style = {styles.text}>
      Hello to index page
    </Text>
  </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:Colors.black
   },
   text:{
    color:Colors.white
   }
  
});
