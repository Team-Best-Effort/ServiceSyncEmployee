import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

interface Employee {
  name: string;
  phoneNumber: string;
  email: string;
}

interface EmployeeInfoProps {
  employee: Employee;
  onBackPress: () => void;
}

const EmployeeInfo: React.FC<EmployeeInfoProps> = ({ employee, onBackPress }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Employee Info</Text>
      </View>
      
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Image 
            source={require('./assets/default-avatar.png')}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.employeeName}>{employee.name}</Text>
      </View>
      
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Phone Number</Text>
          <Text style={styles.infoValue}>{employee.phoneNumber}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email Address</Text>
          <Text style={styles.infoValue}>{employee.email}</Text>
        </View>
      </View>
      
      <View style={styles.navbar}>
        {/* Add your navbar icons here */}
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>💼</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📅</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2C',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    color: 'white',
    fontSize: 24,
    marginRight: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
  },
  employeeName: {
    color: 'white',
    fontSize: 24,
    marginTop: 10,
  },
  infoCard: {
    backgroundColor: '#3C3C3C',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 16,
  },
  infoRow: {
    marginBottom: 10,
  },
  infoLabel: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  infoValue: {
    color: 'white',
    fontSize: 16,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1C1C1C',
    paddingVertical: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
    color: 'white',
  },
});

export default EmployeeInfo;