import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Colors from '@/constants/Colors';
import { getIncomeTypes } from '@/src/database/incomeOperations';
import DatePickerInput from './DatePicker';


const AddIncomeModal = ({ visible, onClose, onAddIncome }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [incomeType, setIncomeType] = useState(1); // Default value for the picker
  const [incomeTypesList, setIncomeTypeList] = useState([]);

  useEffect(() => {
    const fetchIncomeTypes = async () => {
      const incomeTypes = await getIncomeTypes();
      setIncomeTypeList(incomeTypes);
    };

    fetchIncomeTypes();
  }, []);

  const handleDateSelect = (date) => {
    setDate(date); // Update state with selected date
  };

  const handleAdd = () => {
    if (amount.trim() && date.trim() && incomeType) {
      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount)) {
        alert('Please enter a valid amount.');
        return;
      }

      // Pass the income data to the parent component
      onAddIncome({ name, amount: parsedAmount, date, incomeType });
      setName(''); // Reset the input fields
      setAmount('');
      setDate(new Date().toISOString().split('T')[0]);
      setIncomeType(1); // Reset income type
      onClose(); // Close the modal
    } else {
      alert('Please fill out all fields.');
    }
  };

  const closeModal = () => {
    setName('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
    setIncomeType(1);
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Income</Text>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={incomeType}
              onValueChange={(itemValue) => setIncomeType(itemValue)}
              mode="dropdown"
              style={[styles.picker, { borderWidth: 1, borderColor: 'white' }]}
            >
              {incomeTypesList.map((type) => (
                <Picker.Item key={type.id} label={type.name} value={type.id} />
              ))}
            </Picker>
          </View>
          
          <TextInput
            style={styles.input}
            placeholder="Amount"
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          <DatePickerInput
            style={styles.input}
            placeholder="Date (YYYY-MM-DD)"
            placeholderTextColor="#666"
            onSelectDate={handleDateSelect}
          />

          <View style={styles.buttonContainer}>
            <Pressable onPress={closeModal} style={{ backgroundColor: Colors.grey, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 }}>
              <Text style={{ color: Colors.white }}>Cancel</Text>
            </Pressable>
            <Pressable onPress={handleAdd} style={{ backgroundColor: Colors.tintColor, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 }}>
              <Text style={{ color: Colors.white }}>Add</Text>
            </Pressable>
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
    backgroundColor: Colors.black,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    color: Colors.white,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#666',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
    color: 'white',  // Text color inside the input field
  },
  pickerContainer: {
    width: '100%',
    borderColor: '#666',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  picker: {
    width: '100%',
    height: 50,
    color: Colors.white, // Picker text color
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
