import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import Colors from '@/constants/Colors';
import DynamicInput from '@/components/subs/Input';
import * as ImagePicker from 'expo-image-picker'; // Import the image picker
import {getUserById, updateUser} from '@/src/database/userOperations';

export default function EditProfileScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('https://avatar.iran.liara.run/public/5');


  const navigation = useNavigation();
  useEffect(()=>{
    navigation.setOptions({headerShown:false}),
    getUserData()
   },[navigation])

   const handleSave = async () => {
    try {
      await updateUser(1 ,fullName, image, email);
      Alert.alert('Success', 'Profile saved successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Failed to save profile.');
    }
  };

  const getUserData = async () => {
    try {
      const response = await getUserById(1);
      setFullName(response.name);
      setEmail(response.email);
      setImage(response.image);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  const pickImage = async () => {
    // Ask for permission to access the photo library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Open image picker to select an image
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

     console.log(result);

     if (!result.canceled && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri; // Access the uri from assets array
      console.log(imageUri); // Log the correct uri
      setImage(imageUri); // Set the selected image URI
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editImageButton} onPress={pickImage}>
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
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
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