import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import CryptoJS from 'crypto-js';

const userDatabase = new Map();

const registerUser = (username: string, password: string) => {
    if (userDatabase.has(username)) {
    Alert.alert('Registration Failed', 'Username already exists');
  } else {
    userDatabase.set(username, CryptoJS.SHA256(password).toString());
    Alert.alert('Registration Successful', 'You can now log in');
  }
};

const EmployeeLogin: React.FC = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const hashedPassword = CryptoJS.SHA256(password).toString();
    if (userDatabase.has(username) && userDatabase.get(username) === hashedPassword) {
      Alert.alert('Login Successful', 'Welcome!');
      navigation.navigate('EmployeeHome');
    } else {
      Alert.alert('Login Failed', 'Invalid username or password');
    }
  };

  const handleRegister = () => {
    registerUser(username, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Login</Text>

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
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
      
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
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
