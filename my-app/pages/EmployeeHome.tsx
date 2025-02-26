import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

interface EmployeeHomeProps {
  navigation: any;
}

const EmployeeHome: React.FC<EmployeeHomeProps> = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (!user) {
        // If the user is not logged in, navigate to the login screen.
        navigation.navigate('EmployeeLogin');
      }
    });
    return unsubscribe;
  }, [navigation]);

  // Logout functionality
  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.navigate('EmployeeLogin');
    } catch (error: any) {
      Alert.alert('Logout Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container} testID="employee-home-screen">
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.headertext}>Todays Task's</Text>
      
      <View style={styles.taskContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateNumber}>15</Text> 
          <Text style={styles.dateDay}>Monday</Text> 
        </View>
        <View style={styles.line} />

        <View style={styles.tasksContainer}>
          <Text style={styles.location}>Location: Office</Text>
          <View style={styles.taskList}>
            <Text style={styles.task}>• Task 1</Text>
            <Text style={styles.task}>• Task 2</Text>
            <Text style={styles.task}>• Task 3</Text>
          </View>
        </View>
      </View>

      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('EmployeeHome')}>
          <Text style={styles.navIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('EmployeeWorksiteInformation')}>
          <Text style={styles.navIcon}>💼</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('EmployeeCalendar')}>
          <Text style={styles.navIcon}>📅</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('EmployeeInfo')}>
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
  logoutButton: {
    position: 'absolute',
    top: 20, 
    left: 16,
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    zIndex: 1, 
  },
  logoutText: {
    color: 'white',
    fontSize: 14,
  },
  headertext: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    margin: 16,
    marginTop: 60,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    margin: 16,
  },
  taskContainer: {
    flexDirection: 'row',
    backgroundColor: '#3C3C3C',
    borderRadius: 10,
    margin: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2, 
    borderColor: 'green',
  },
  dateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateNumber: {
    fontSize: 48, 
    color: 'white',
  },
  dateDay: {
    fontSize: 18,
    color: 'white',
  },
  tasksContainer: {
    flex: 2,
    paddingLeft: 16,
  },
  location: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  taskList: {
    marginTop: 8,
  },
  task: {
    fontSize: 16,
    color: 'white',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    backgroundColor: '#1C1C1C',
    paddingVertical: 20,
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
    color: 'white',
  },
  line: {
    width: 2, 
    height: '100%', 
    backgroundColor: 'white', 
  },
});

export default EmployeeHome;