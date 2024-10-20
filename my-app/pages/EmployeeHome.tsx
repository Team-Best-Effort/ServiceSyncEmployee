import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

const EmployeeHome: React.FC = () => {
  return (
    {/*Today's Tasks */}
    <SafeAreaView style={styles.container}>
    <Text style={styles.headertext}>Today's Tasks</Text>
    
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
      {/* Upcoming Schedule */}
      <View style={styles.header}>
          <Text style={styles.sectionTitle}>Upcoming Schedule</Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>View Schedule</Text>
          </TouchableOpacity>
        </View>

        {/* Upcoming Schedule Events */}
        <View style={styles.eventContainer}>
          <Text style={styles.eventTitle}>Visit Jobsite XYZ</Text>
          <Text style={styles.eventDescription}>Give general description of tasks</Text>
          <Text style={styles.eventTime}>Tomorrow, 9:00AM</Text>
        </View>

        <View style={styles.eventContainer}>
          <Text style={styles.eventTitle}>Meeting</Text>
          <Text style={styles.eventDescription}>Meeting Description with Person</Text>
          <Text style={styles.eventTime}>Friday, 1:00PM</Text>
        </View>

        {/* Payroll Button */}
        <TouchableOpacity style={styles.payrollButton}>
          <Text style={styles.payrollText}>Payroll</Text>
        </TouchableOpacity>

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
  },
  headertext:{
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    margin: 16,
    marginTop: 60
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
    borderColor: 'green'
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
  eventContainer: {
    backgroundColor: '#3C3C3C',
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: 'green',
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  eventDescription: {
    fontSize: 14,
    color: 'white',
    marginBottom: 8,
  },
  eventTime: {
    fontSize: 12,
    color: 'gray',
  },
  payrollButton: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  payrollText: {
    fontSize: 24,
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
