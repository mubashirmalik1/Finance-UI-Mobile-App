import Colors from '@/constants/Colors';
import { addExpense, getExpenseTypes } from '@/src/database/expenseOperations';
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';
import DatePickerInput from './DatePicker';

interface AddExpenseTypeModalProps {
  visible: boolean;
  onClose: () => void;
  onAddExpenseType: () => void;
}

const AddExpenseTypeModal: React.FC<AddExpenseTypeModalProps> = ({ visible, onClose, onAddExpenseType }) => {
  const [name, setName] = useState('');
  const [expenseType, setExpenseType] = useState(1);
  const [expenseTypeList, setExpenseTypeList] = useState([]);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const fetchExpenseTypes = async () => {
      try {
        const types = await getExpenseTypes();
        setExpenseTypeList(types);
      } catch (error) {
        console.error('Failed to fetch expense types:', error);
      }
    };

    fetchExpenseTypes();
  }, []);

  const handleDateSelect = (date: React.SetStateAction<string>) => {
    setDate(date); // Update state with selected date
  };

  const closeModal = () => {
    setExpenseType(1);
    setAmount('');
    setName('');
    setDate(new Date().toISOString().split('T')[0]);
    onClose();
  };

  const handleAdd = () => {
    if (name.trim(),expenseType, amount.trim() && date.trim()) {
      addExpense(name,amount, date, expenseType); 
      setName('');
      setAmount('');
      setDate(new Date().toISOString().split('T')[0]);
      setExpenseType(1);
      onAddExpenseType();
      onClose(); 
    } else {
      alert('Please enter a valid expense type name.');
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Expense</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={name}
            placeholderTextColor="#666" 
            onChangeText={setName}
          />
          
          <View style={styles.pickerContainer}>
            <Picker
               selectedValue={expenseType}
               onValueChange={(itemValue) => setExpenseType(itemValue)}
              mode="dropdown"
              style={styles.picker}
            >
               {expenseTypeList.map((item) => (
                <Picker.Item key={item.id} label={item.name} value={item.id} />
              ))}
            </Picker>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Amount"
            value={amount}
            placeholderTextColor="#666" 
            onChangeText={setAmount}
            keyboardType="numeric"
          />
            <DatePickerInput
            style={styles.input}
            placeholder="Date (YYYY-MM-DD)"
            placeholderTextColor="#666"
            onSelectDate={handleDateSelect}
          />

          <View style={styles.buttonContainer}>
            <Pressable onPress={closeModal} style={{ backgroundColor:Colors.grey, paddingHorizontal:20, paddingVertical:10, borderRadius:10}}>
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
});
