import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import {
<<<<<<< HEAD
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Link, router } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // adjust the path if needed

const LogIn: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [key]: value });
    setErrorMsg('');
  };

  const handleSubmit = async () => {
    const { email, password } = formData;

    if (!email.trim() || !password.trim()) {
      setErrorMsg('⚠️ Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      setErrorMsg('');
      router.replace('/Home');
    } catch (error: any) {
      console.error('Login error:', error.message);
      setErrorMsg('❌ Invalid credentials. Please try again.');
=======
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth } from './config/config';  // Make sure this path is correct

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setError('');
    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        router.replace('/(tabs)');  // Navigate to home tabs
      } else {
        setError('Please verify your email before logging in.');
        await auth.signOut(); // Optional: log out unverified user
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
>>>>>>> 046037c269597856046027e78e1e20ece87f26ca
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.card}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>LL</Text>
        </View>
        <Text style={styles.title}>Login</Text>

        {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

        <TextInput
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
          placeholderTextColor="#888"
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholderTextColor="#888"
        />

<<<<<<< HEAD
        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Log In'}</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
          <Text style={{ color: 'black', fontSize: 16 }}>
            If you don&apos;t have an account, please
          </Text>
          <Link
            href="/signup"
            style={{
              fontWeight: 'bold',
              color: '#146C94',
              fontSize: 16,
              marginLeft: 4,
            }}
          >
            Register.
          </Link>
=======
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}} style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
>>>>>>> 046037c269597856046027e78e1e20ece87f26ca
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#19A7CE',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 32,
    borderRadius: 22,
    width: '100%',
<<<<<<< HEAD
    maxWidth: 400,
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.6)',
=======
    maxWidth: 380,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    alignItems: 'stretch',
  },
  logoCircle: {
    alignSelf: 'center',
    backgroundColor: '#146C94',
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    elevation: 4,
  },
  logoText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 2,
>>>>>>> 046037c269597856046027e78e1e20ece87f26ca
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#146C94',
    textAlign: 'center',
    marginBottom: 28,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    color: '#222',
  },
  button: {
    backgroundColor: '#146C94',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
<<<<<<< HEAD
  errorText: {
    color: '#b91c1c',
    marginBottom: 12,
    fontWeight: '600',
    textAlign: 'center',
=======
  error: {
    color: '#e74c3c',
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 15,
  },
  forgotPassword: {
    marginTop: 12,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#146C94',
    fontSize: 15,
    fontWeight: '500',
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 22,
  },
  signupText: {
    color: '#333',
    fontSize: 16,
  },
  signupLink: {
    color: '#146C94',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 6,
>>>>>>> 046037c269597856046027e78e1e20ece87f26ca
  },
});
