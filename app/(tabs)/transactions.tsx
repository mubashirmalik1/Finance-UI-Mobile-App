import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, Modal } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import Colors from '@/constants/Colors';
import { getAllExpenses } from '@/src/database/expenseOperations';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Spending {
  id: string;
  name: string;
  amount: string;
  date: string;
  user_id: string;
  invoiceNumber: string;
  expense_type_id: string;
  expense_type_name: string;
}


export default function BillingScreen() {
  const [activeTab, setActiveTab] = useState('My Spendings');
  const [searchQuery, setSearchQuery] = useState('');
  const [spendingList, setSpendingList] = useState<Spending[]>([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterType, setFilterType] = useState<'month' | 'date' | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    getAllSpending();
  }, [navigation])

  const getAllSpending = async () => {
    const response = await getAllExpenses();
    setSpendingList(response);
  }

  const handleFilterPress = () => {
    setShowFilterModal(true);
  };

  const handleFilterSelect = (type: 'month' | 'date') => {
    setFilterType(type);
    if (type === 'date') {
      setShowDatePicker(true);
    } else {
      setShowFilterModal(false);
      // Implement month filter logic here
      console.log('Filter by month');
    }
  };

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      setShowFilterModal(false);
      // Implement date filter logic here
      console.log('Filter by date:', date.toISOString());
    }
  };




  const renderInvoiceItem = ({ item, index }: { item: Spending, index: number }) => (
    <TouchableOpacity style={styles.invoiceItem}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }} key={index}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ backgroundColor: Colors.black, padding: 13, borderRadius: 50, marginRight: 10 }}>
            <Feather name="arrow-up" size={22} color={Colors.white} />
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ color: Colors.white, fontSize: 17, fontWeight: '700' }}>{item.name}</Text>
            <Text style={{ color: Colors.white }}>{item.date}</Text>
          </View>
        </View>
        <View>
          <Text style={{ color: Colors.white, fontSize: 17, fontWeight: '700' }}>
            Rs {item.amount}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My History</Text>
      </View>

      <View style={styles.tabContainer}>
        {['My Spendings', 'My Income'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
          <Ionicons name="filter" size={20} color="white" />
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={spendingList}
        renderItem={renderInvoiceItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowFilterModal(false)}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.filterOption} onPress={() => handleFilterSelect('month')}>
              <Text style={styles.filterOptionText}>Filter by Month</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterOption} onPress={() => handleFilterSelect('date')}>
              <Text style={styles.filterOptionText}>Filter by Specific Date</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingTop: 40,

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    marginTop: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: '#242424',
  },
  tabText: {
    color: '#888',
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#242424',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    paddingVertical: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#242424',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterButtonText: {
    color: 'white',
    marginLeft: 4,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  invoiceItem: {
    backgroundColor: '#242424',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  label: {
    color: '#888',
    fontSize: 12,
    marginBottom: 2,
  },
  value: {
    color: 'white',
    marginBottom: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#242424',
    borderRadius: 8,
    padding: 16,
    width: '80%',
  },
  filterOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  filterOptionText: {
    color: 'white',
    fontSize: 16,
  },
});