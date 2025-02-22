import React from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";

const EmployeeCalendar = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Employee Calendar</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {hours.map((hour) => (
          <View key={hour} style={styles.timeSlot}>
            <View style={styles.timeLabelContainer}>
              <Text style={styles.timeLabel}>{hour}:00</Text>
            </View>
            <View style={styles.slotContainer} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#2C2C2C" },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginTop: 60,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  scrollContainer: { paddingBottom: 20 },
  timeSlot: {
    flexDirection: "row",
    alignItems: "center",
    height: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  timeLabelContainer: {
    width: 40,
    alignItems: "flex-end",
    paddingRight: 4,
  },
  timeLabel: { color: "#aaa", fontSize: 10 },
  slotContainer: {
    flex: 1,
    height: "100%",
    borderLeftWidth: 1,
    borderLeftColor: "#444",
  },
});

export default EmployeeCalendar;
