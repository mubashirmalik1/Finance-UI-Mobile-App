import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { PieChart } from 'react-native-gifted-charts';

const MyExpense = () => {
    const pieData = [
        {
          value: 47,
          color: Colors.tintColor,
          gradientCenterColor: '#006DFF',
          focused: true,
        },
        { value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE' },
        { value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3' },
        { value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97' },
      ];
  return (
    <View style={{ gap: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    <View>
      <Text style={{ color: Colors.white, fontSize: 16 }}>
        My <Text style={{ fontWeight:'900' }}>Expense</Text>
      </Text>
      <Text style={{ color: Colors.white, fontSize: 36, fontWeight: 700 }}>
        $1432.
        <Text style={{ fontSize: 16 }}>11</Text>
      </Text>
    </View>
    <View>
      <PieChart
        data={pieData}
        donut
        showGradient
        semiCircle
        focusOnPress
        sectionAutoFocus
        radius={70}
        innerRadius={55}
        innerCircleColor={Colors.black}
        centerLabelComponent={() => {
          return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text
                style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>
                47%
              </Text>
            </View>
          );
        }}
      />
    </View>
  </View>

  )
}

export default MyExpense

const styles = StyleSheet.create({})