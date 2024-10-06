import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';
import Colors from '@/constants/Colors';

const AddIncomeModal = ({ visible, onClose, onAddIncome }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [incomeType, setIncomeType] = useState('salary'); // Default value for the picker

  const handleAdd = () => {
    if (name.trim() && amount.trim() && date.trim() && incomeType) {
      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount)) {
        alert('Please enter a valid amount.');
        return;
      }

      // Pass the income data to the parent component
      onAddIncome({ name, amount: parsedAmount, date, incomeType });
      setName(''); // Reset the input fields
      setAmount('');
      setDate('');
      setIncomeType('salary'); // Reset income type
      onClose(); // Close the modal
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Income</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Income Name"
            placeholderTextColor="white"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Amount"
            placeholderTextColor="white"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          <TextInput
            style={styles.input}
            placeholder="Date (YYYY-MM-DD)"
            placeholderTextColor="white"
            value={date}
            onChangeText={setDate}
          />

          {/* Picker for income type */}
          <Picker
            selectedValue={incomeType}
            style={styles.picker}
            onValueChange={(itemValue) => setIncomeType(itemValue)}
          >
            <Picker.Item label="Salary" value="salary" />
            <Picker.Item label="Interest" value="interest" />
            <Picker.Item label="Freelance" value="freelance" />
            <Picker.Item label="Investments" value="investments" />
            <Picker.Item label="Other" value="other" />
          </Picker>

          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={onClose} />
            <Button title="Add" onPress={handleAdd} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddIncomeModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor:Colors.black,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
    color: 'white',  // Text color inside the input field
  },
  picker: {
    width: '100%',
    height: 50,
    marginBottom: 20,
    color: 'black', // Picker text color
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
