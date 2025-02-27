import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView, Alert, Linking } from 'react-native';

interface Task {
  id: number;
  title: string;
}

interface EmployeeWorksiteInformationProps {
  navigation: any;
}

const EmployeeWorksiteInformation: React.FC<EmployeeWorksiteInformationProps> = ({navigation}) => {

  const worksiteData = {
    address: {
      street: '1 Apple Park Way',
      city: 'Cupertino',
      state: 'CA',
      zipCode: '95014',
    },
    tasks: [
      { id: 1, title: 'Install new equipment' },
      { id: 2, title: 'Test system functionality' },
      { id: 3, title: 'Document installation' },
    ],
    deadline: 'December 31, 2024',
  };

  const handleGetDirections = () => {
    const { street, city, state, zipCode } = worksiteData.address;
    const formattedAddress = encodeURIComponent(`${street}, ${city}, ${state} ${zipCode}`);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;
  
    Linking.openURL(mapsUrl).catch(() => {
      Alert.alert('Error', 'Could not open Google Maps');
    });
  };

  const { address, tasks, deadline } = worksiteData;


  return (
    <SafeAreaView style={styles.container} testID="employee-work-screen">
      <ScrollView>
        <Text style={styles.header}>Worksite Information</Text>

        <Text style={styles.sectionTitle}>Location Details</Text>
        <View style={styles.locationContainer}>
          <Image 
            source={require('../assets/icon.png')} 
            resizeMode="cover"
            style={{ width: 100, height: 100 }} // Adjust size as needed
          />
          <View style={styles.locationTextContainer}>
            <Text style={styles.text}>Address</Text>
            <Text style={styles.text}>{address.street}</Text>
            <Text style={styles.text}>
              {`${address.city}, ${address.state}, ${address.zipCode}`}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Tasks to be Completed</Text>
        <View>
          {tasks.map((task) => (
            <Text style={styles.taskText} key={task.id}>
              {`${task.id}. ${task.title}`}
            </Text>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Deadline Date</Text>
        <Text style={styles.deadlineText}>{deadline}</Text>

        <TouchableOpacity style={styles.button} onPress={handleGetDirections}>
          <Text style={styles.buttonText}>Get Directions</Text>
        </TouchableOpacity>
      </ScrollView>

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
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: 'white', 
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
    color: 'white', 
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  locationTextContainer: {
    marginLeft: 10,
  },
  text: {
    color: 'white', 
  },
  taskText: {
    fontSize: 16,
    marginLeft: 15,
    lineHeight: 24,
    color: 'white', 
  },
  deadlineText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    color: 'white', 
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
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
});

export default EmployeeWorksiteInformation;

