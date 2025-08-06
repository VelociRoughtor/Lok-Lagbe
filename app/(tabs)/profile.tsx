import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function ProfileScreen() {
  // Dummy data (can be fetched from Firebase or other backend)
  const user = {
    name: 'User one',
    email: 'abcd@gmail.com',
    avatar: 'https://i.pravatar.cc/150?img=12', // Example avatar image
    bookings: [
      { id: 1, route: 'Home Cleaning', date: '2025-08-10', seat: 'A3' },
      { id: 2, route: 'Mounting', date: '2025-08-15', seat: 'B1' },
    ]
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>

      <Text style={styles.sectionTitle}>My Work</Text>
      {user.bookings.map((booking) => (
        <View key={booking.id} style={styles.bookingItem}>
          <Text style={styles.bookingText}>{booking.route}</Text>
          <Text style={styles.bookingSubText}>Date: {booking.date}</Text>
          <Text style={styles.bookingSubText}>Seat: {booking.seat}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#eceefc',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#3a125d',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3a125d',
  },
  email: {
    fontSize: 16,
    color: '#544d4d',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 20,
    marginBottom: 10,
    color: '#3a125d',
  },
  bookingItem: {
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 3,
  },
  bookingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3a125d',
  },
  bookingSubText: {
    fontSize: 14,
    color: '#636060',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#e89d07',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
