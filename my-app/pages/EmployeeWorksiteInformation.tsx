import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

interface Task {
  id: number;
  title: string;
}

interface EmployeeWorksiteInformationProps {
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  tasks: Task[];
  deadline: string;
  onGetDirections: () => void;
  onClockIn: () => void;
}

const EmployeeWorksiteInformation: React.FC<EmployeeWorksiteInformationProps> = ({
  address,
  tasks,
  deadline,
  onGetDirections,
  onClockIn,
}) => {
  return (
    <SafeAreaView style={styles.container}>
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

        <TouchableOpacity style={styles.button} onPress={onGetDirections}>
          <Text style={styles.buttonText}>Get Directions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onClockIn}>
          <Text style={styles.buttonText}>Clock In to Site</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.navbar}>
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

