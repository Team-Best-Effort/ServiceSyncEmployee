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
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>Worksite Information</Text>
        </View>

        <View>
          <Text>Location Details</Text>
          <View>
            <Image 
              source={require('../assets/icon.png')} 
              resizeMode="cover"
            />
            <View>
              <Text>Address</Text>
              <Text>{address.street}</Text>
              <Text>
                {`${address.city}, ${address.state}, ${address.zipCode}`}
              </Text>
            </View>
          </View>
        </View>

        <View>
          <Text>Tasks to be Completed</Text>
          <View>
            {tasks.map((task) => (
              <Text key={task.id}>
                {`${task.id}. ${task.title}`}
              </Text>
            ))}
          </View>
        </View>

        <View>
          <Text>Deadline Date</Text>
          <Text>{deadline}</Text>
        </View>

        <TouchableOpacity 
          onPress={onGetDirections}
        >
          <Text >Get Directions</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={onClockIn}
        >
          <Text>Clock In to Site</Text>
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

