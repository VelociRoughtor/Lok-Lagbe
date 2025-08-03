// CleaningListScreen.js
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const cleaningData = [
  {
    id: '1',
    title: 'Home Deep Cleaning',
    price: '৳1200',
    description: 'Comprehensive cleaning for your entire home.',
    location: 'Dhaka',
    dateTime: 'Aug 5, 10:00 AM',
  },
  {
    id: '2',
    title: 'Bathroom Sanitization',
    price: '৳500',
    description: 'Deep cleaning and disinfection of bathroom.',
    location: 'Chittagong',
    dateTime: 'Aug 6, 3:00 PM',
  },
  {
    id: '3',
    title: 'Kitchen Degreasing',
    price: '৳800',
    description: 'Remove grease and sanitize your kitchen.',
    location: 'Rajshahi',
    dateTime: 'Aug 7, 11:30 AM',
  },
  {
    id: '4',
    title: 'Window Glass Cleaning',
    price: '৳300',
    description: 'Streak-free cleaning of all glass surfaces.',
    location: 'Khulna',
    dateTime: 'Aug 8, 9:00 AM',
  },
  {
    id: '5',
    title: 'Sofa Shampooing',
    price: '৳1000',
    description: 'Deep shampooing and vacuum of sofas.',
    location: 'Sylhet',
    dateTime: 'Aug 8, 4:00 PM',
  },
  {
    id: '6',
    title: 'Carpet Cleaning',
    price: '৳900',
    description: 'Steam cleaning and dust removal from carpets.',
    location: 'Barisal',
    dateTime: 'Aug 9, 2:00 PM',
  },
  {
    id: '7',
    title: 'Office Cleaning',
    price: '৳1500',
    description: 'Complete office room and floor sanitation.',
    location: 'Dhaka',
    dateTime: 'Aug 10, 11:00 AM',
  },
  {
    id: '8',
    title: 'Ceiling Fan Dusting',
    price: '৳200',
    description: 'Dust and wipe your ceiling fans safely.',
    location: 'Comilla',
    dateTime: 'Aug 10, 5:00 PM',
  },
  {
    id: '9',
    title: 'Fridge Cleaning',
    price: '৳400',
    description: 'Interior and exterior fridge sanitation.',
    location: 'Narayanganj',
    dateTime: 'Aug 11, 12:00 PM',
  },
  {
    id: '10',
    title: 'Mattress Disinfection',
    price: '৳700',
    description: 'Dust mite and bacteria removal from mattress.',
    location: 'Bogura',
    dateTime: 'Aug 11, 6:00 PM',
  },
];

export default function CleaningListScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => console.log('Pressed:', item.title)}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.dashedLine} />
      <View style={styles.cardFooter}>
        <View style={styles.locationRow}>
          <Ionicons name="location-sharp" size={16} color="#636060" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
        <Text style={styles.datetime}>{item.dateTime}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3a125d" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Cleaning</Text>
      </View>

      <FlatList
        data={cleaningData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e9fdff',
  },
  header: {
    backgroundColor: '#3a125d',
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  list: {
    padding: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#3a125d',
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: '#f9a805ff',
  },
  description: {
    fontSize: 14,
    color: '#585454ff',
    marginBottom: 5,
  },
  dashedLine: {
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#3a125d',
    marginVertical: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 13,
    color: '#04ad2eff',
  },
  datetime: {
    fontSize: 13,
    color: '#04ad2eff',
  },
});
