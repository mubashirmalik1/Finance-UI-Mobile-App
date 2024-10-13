import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import Colors from '@/constants/Colors';
import DynamicInput from '@/components/subs/Input';

export default function EditProfileScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  useEffect(()=>{
    navigation.setOptions({headerShown:false})
   },[navigation])
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: 'https://avatar.iran.liara.run/public/5' }}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editImageButton}>
          <Ionicons name="pencil" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <DynamicInput 
            placeholder="Full Name"
            value={fullName}
            onChange={setFullName} />
        </View>

        <View style={styles.inputContainer}>
           <DynamicInput 
            placeholder="Email"
            value={email}
            onChange={setEmail} />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:Colors.black
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editImageButton: {
    position: 'relative',
    right: 10,
    bottom: 25,
    backgroundColor: Colors.tintColor,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 8,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
  },
  buttonContainer: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 24,
  },

  saveButton: {
    backgroundColor: Colors.tintColor,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    fontWeight: '800',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',

  },
});


// import Colors from '@/constants/Colors';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import { useNavigation } from 'expo-router';
// import { useEffect } from 'react';
// import { StyleSheet, View, Text } from 'react-native';


// export default function profile() {
//   const navigation = useNavigation();

//   useEffect(()=>{
//     navigation.setOptions({headerShown:false})
//   })
//   return (
//     <View style={styles.container}>
//     <Text style = {styles.text}>
//       Hello to index page
//     </Text>
//   </View>
//   );
// }

// const styles = StyleSheet.create({
//   container:{
//     flex:1,
//     justifyContent:'center',
//     alignItems:'center',
//     backgroundColor:Colors.black
//    },
//    text:{
//     color:Colors.white
//    }
  
// });
