import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { router } from 'expo-router';

const EditProfile = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const uid = auth.currentUser?.uid;
        if (!uid) return;

        const userRef = doc(db, 'users', uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserData(data);
          setFullName(data.fullName || '');
          setPhone(data.phone || '');
        } else {
          Alert.alert('Error', 'User data not found');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleSave = async () => {
    if (!fullName.trim() || !phone.trim()) {
      Alert.alert('Validation Error', 'Full Name and Phone are required.');
      return;
    }

    try {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        fullName: fullName.trim(),
        phone: phone.trim(),
      });

      Alert.alert('Success', 'Profile updated successfully.');
      router.replace('/Home/(tabs)/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile.');
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#146C94" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      {/* Editable Fields */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
        placeholder="Full Name"
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone"
        keyboardType="phone-pad"
      />

      {/* Non-editable Fields */}
      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Email:</Text>
        <Text style={styles.infoValue}>{userData?.email || 'N/A'}</Text>

        <Text style={styles.infoLabel}>NID:</Text>
        <Text style={styles.infoValue}>{userData?.nid || 'N/A'}</Text>

        <Text style={styles.infoLabel}>UID:</Text>
        <Text style={styles.infoValue}>{auth.currentUser?.uid || 'N/A'}</Text>

        <Text style={styles.infoLabel}>Created At:</Text>
        <Text style={styles.infoValue}>
          {userData?.createdAt?.toDate?.().toLocaleString() || 'N/A'}
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 24,
    paddingBottom: 40,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#146C94',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#544d4d',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  infoBox: {
    marginTop: 10,
    backgroundColor: '#eceefc',
    padding: 12,
    borderRadius: 10,
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#3a125d',
    marginTop: 8,
  },
  infoValue: {
    fontSize: 15,
    color: '#544d4d',
  },
  button: {
    backgroundColor: '#146C94',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
