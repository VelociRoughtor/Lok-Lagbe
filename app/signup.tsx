import React, { useState } from 'react';
<<<<<<< HEAD
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, router } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

export default function SignUpScreen() {
  const [fullName, setFullName] = useState('');
  const [nid, setNid] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
=======
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth';
import { auth } from './config/config'; // Your Firebase Auth instance
import { router } from 'expo-router';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    nid: '',
    phone: '',
    email: '',
    password: '',
  });
>>>>>>> 046037c269597856046027e78e1e20ece87f26ca
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setErrorMsg('');
    setSuccessMsg('');

<<<<<<< HEAD
    if (!fullName || !nid || !phone || !email || !password) {
      setErrorMsg('⚠️ Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('⚠️ Password must be at least 6 characters long.');
=======
  const handleSubmit = async () => {
    if (!formData.name || !formData.nid || !formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
>>>>>>> 046037c269597856046027e78e1e20ece87f26ca
      return;
    }

    setLoading(true);

    try {
<<<<<<< HEAD
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: fullName,
      });

      // Save user details in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        fullName,
        nid,
        phone,
        email,
        createdAt: serverTimestamp(),
        work: [],
        acceptedWorks: [], // ← ADDED: Empty array for accepted works
      });

      setSuccessMsg(`✅ Account created successfully for ${user.email}`);

      setTimeout(() => {
        router.replace('/login');
      }, 1500);
    } catch (error) {
      let message = 'An unknown error occurred.';
      if (error instanceof Error) message = error.message;
      setErrorMsg(`❌ ${message}`);
=======
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await updateProfile(userCredential.user, { displayName: formData.name });

      // Send verification email
      await sendEmailVerification(userCredential.user);

      Alert.alert(
        'Success',
        'Account created! Please check your email to verify your account before logging in.'
      );
      router.replace('/login'); // Navigate to login page
    } catch (error: any) {
      console.error('Firebase signup error:', error);
      Alert.alert('Sign Up Error', error.message);
>>>>>>> 046037c269597856046027e78e1e20ece87f26ca
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join us by filling in your details</Text>

<<<<<<< HEAD
      {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
      {successMsg ? <Text style={styles.successText}>{successMsg}</Text> : null}
=======
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={formData.name}
          onChangeText={(text) => handleChange('name', text)}
        />

        <TextInput
          style={styles.input}
          placeholder="NID No."
          keyboardType="number-pad"
          value={formData.nid}
          onChangeText={(text) => handleChange('nid', text)}
        />
>>>>>>> 046037c269597856046027e78e1e20ece87f26ca

      <TextInput
        placeholder="Full Name"
        placeholderTextColor="#8b8686"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
      />

      <TextInput
        placeholder="NID Number"
        placeholderTextColor="#8b8686"
        value={nid}
        onChangeText={setNid}
        style={styles.input}
        keyboardType="number-pad"
      />

      <TextInput
        placeholder="Phone Number"
        placeholderTextColor="#8b8686"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        keyboardType="phone-pad"
      />

<<<<<<< HEAD
      <TextInput
        placeholder="Email"
        placeholderTextColor="#8b8686"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#8b8686"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.button, loading ? styles.buttonDisabled : {}]}
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.linkText}>
        Already have an account?{' '}
        <Link href="/login" style={styles.link}>
          Sign In
        </Link>
      </Text>
    </View>
=======
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Creating...' : 'Create Account'}</Text>
        </TouchableOpacity>

        <View style={styles.loginLink}>
          <Text style={styles.loginText}>If you already have an account, please </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.loginLinkText}>Log In.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
>>>>>>> 046037c269597856046027e78e1e20ece87f26ca
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
<<<<<<< HEAD
    padding: 24,
=======
    padding: 16,
  },
  card: {
    backgroundColor: '#D7D7D7',
    padding: 24,
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    elevation: 5,
>>>>>>> 046037c269597856046027e78e1e20ece87f26ca
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#146C94',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    color: '#544d4d',
    marginBottom: 25,
  },
  input: {
    height: 50,
    borderColor: '#146C94',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    color: '#544d4d',
  },
  button: {
    backgroundColor: '#146C94',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
    marginTop: 5,
  },
  buttonDisabled: {
    opacity: 0.6,
    backgroundColor: '#636060',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#eceefc',
    fontSize: 17,
    fontWeight: '600',
  },
<<<<<<< HEAD
  linkText: {
    marginTop: 25,
    textAlign: 'center',
    color: '#544d4d',
    fontSize: 16,
  },
  link: {
    color: '#146C94',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: '#b91c1c',
    marginBottom: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  successText: {
    color: '#3a6e00',
    marginBottom: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
=======
  loginLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: 'black',
    fontSize: 16,
  },
  loginLinkText: {
    fontWeight: 'bold',
    color: '#146C94',
    fontSize: 16,
  },
>>>>>>> 046037c269597856046027e78e1e20ece87f26ca
});
