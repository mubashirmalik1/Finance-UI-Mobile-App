import Colors from '@/constants/Colors';
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';

const AddExpenseTypeModal = ({ visible, onClose, onAddExpenseType }) => {
  const [name, setName] = useState('');

  const handleAdd = () => {
    if (name.trim()) {
        console.log('test'+name);
      onAddExpenseType(name); // Call the function passed via props
      setName(''); // Reset the input after adding
      onClose(); // Close the modal
    } else {
      alert('Please enter a valid expense type name.');
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Expense Type</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Expense Type Name"
            value={name}
            placeholderTextColor="#666" 
            onChangeText={setName}
          />

          <View style={styles.buttonContainer}>
            <Pressable onPress={onClose} style={{ backgroundColor:Colors.grey, paddingHorizontal:20, paddingVertical:10, borderRadius:10}}>
                <Text style={{color:Colors.white}}>Cancel</Text> 
            </Pressable>
            <Pressable onPress={handleAdd} style={{ backgroundColor:Colors.tintColor, paddingHorizontal:20, paddingVertical:10, borderRadius:10}}>
                <Text style={{color:Colors.white}}>Add</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddExpenseTypeModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)', // semi-transparent background
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: Colors.black,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    color:Colors.white,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#666',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
    color:Colors.white
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
