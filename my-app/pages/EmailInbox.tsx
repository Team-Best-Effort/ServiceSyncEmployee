import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';

const emails = [
  {
    subject: 'Meeting Reminder',
    preview: "Don't forget about the meeting scheduled for tomorrow at 10 AM.",
    receivedTime: '9:00 AM',
    profilePic: './icons/image.png',
  },
  {
    subject: 'Project Update',
    preview: 'The project update meeting has been rescheduled to next week.',
    receivedTime: '3:00 PM',
    profilePic: './icons/image.png',
  },
  {
    subject: 'Weekly Report',
    preview: 'Your weekly report is ready for review.',
    receivedTime: '10:00 AM',
    profilePic: './icons/image.png',
  },
  {
    subject: 'New Task Assigned',
    preview: 'You have been assigned a new task in the project.',
    receivedTime: '5:00 PM',
    profilePic: './icons/image.png',
  },
];

const EmailInbox: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headertext}>Inbox</Text>
      </View>

      <ScrollView style={styles.emailList}>
        {emails.map((email, index) => (
          <View key={index} style={styles.emailHeader}>
            <View style={styles.pfpContainer}>
              <View style={styles.pfpOutline}>
                <Image source={{ uri: email.profilePic }} style={styles.pfp} />
              </View>
            </View>
            <View style={styles.emailContent}>
              <View style={styles.subjectRow}>
                <Text style={styles.subject}>{`${email.subject}`}</Text>
                <Text style={styles.receivedTime}>{`${email.receivedTime}`}</Text>
              </View>
              <Text style={styles.preview}>{`${email.preview}`}</Text>
            </View>
            <View style={styles.line} />
          </View>
        ))}
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
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginBottom: 1,
    paddingBottom: 1,
    alignItems: 'center',
  },
  headertext: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    margin: 16,
    marginTop: 60,
  },
  emailList: {
    flex: 1,
  },
  emailHeader: {
    borderRadius: 10,
    margin: 8,
    padding: 8,
    flexDirection: 'row',
    position: 'relative',
  },
  pfpContainer: {
    marginRight: 12, 
  },
  pfpOutline: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pfp: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  emailContent: {
    flex: 1,
  },
  subjectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
  },
  subject: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  receivedTime: {
    fontSize: 14,
    color: 'white',
  },
  preview: {
    fontSize: 16,
    color: 'lightgray',
    marginTop: 4,
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
    height: 2,
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default EmailInbox;
