// DatePickerInput.js
import React, { useState } from 'react';
import { View, TextInput, Platform, TouchableOpacity, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePickerInput = ({ placeholder = "Select Date", onSelectDate, initialDate = new Date(), style, placeholderTextColor }) => {
  const [date, setDate] = useState(initialDate);
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    // Format the date as 'YYYY-MM-DD' and pass it to the parent
    const formattedDate = currentDate.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
    onSelectDate(formattedDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View style={{width:'100%'}}>
      {/* TouchableOpacity to open the DatePicker when clicking the TextInput */}
      <Pressable onPress={showDatepicker}>
        <TextInput
          style={style}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor || "#666"}
          value={date.toISOString().split('T')[0]} // Show formatted date (YYYY-MM-DD)
          editable={false} // Disable keyboard input so the date picker opens on tap
        />
      </Pressable>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DatePickerInput;
