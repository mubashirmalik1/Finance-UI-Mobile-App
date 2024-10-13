import { Text, StyleSheet, View, TextInput } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';
interface DynamicInputProps {
    placeholder?: string;
    value: string;
    onChange: (text: string) => void;
  }

  const DynamicInput: React.FC<DynamicInputProps> = ({ placeholder, value, onChange }) => {
    return (
        <TextInput
        placeholder={placeholder}
        placeholderTextColor="#666" 
        value={value}
        onChangeText={onChange}
        style={styles.input}
      />
    )
  
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        padding: 10,
        borderColor: '#666',
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 5,
        color:Colors.white
      },
})




export default DynamicInput;