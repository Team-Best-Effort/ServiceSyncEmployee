import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
// Import Firebase 
import auth from '@react-native-firebase/auth';

interface Props {
  navigation: any;
}

const EmployeeLogin: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState(''); // username will be the email
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Sign in using Firebase Auth
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => {
        Alert.alert('Login Successful', 'Welcome!');
        navigation.navigate('EmployeeHome');
      })
      .catch((error) => {
        Alert.alert('Login Failed', error.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Login</Text>

      <Text style={styles.label}>Username (Email)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Button to navigate to the Sign Up screen */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('EmployeeSignUp')}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2C',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  label: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#1C1C1C',
    color: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EmployeeLogin;
